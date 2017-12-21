import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { Card, Button, DataTable, TableBody, DialogContainer } from 'react-md';
import Domain from '../components/Domain';

import {
  CLIENT_TYPES,
  CURRENT_DOMAIN_NAME,
  DELETE_DOMAIN_WARNING_MESSAGE,
  DUPLICATE_DOMAIN_MESSAGE,
} from '../utils/constants';

import {
  updateDomain,
  getClient,
  getRole,
  getUser,
  handleRealmDeletion,
  loadDomains,
  saveDomain,
} from '../store/domain/action';

import '../assets/stylesheets/ManageDomain.css';

export class ManageDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalVisible: false,
      duplicateModalVisible: false,
      domainList: props.domainList || [],
      selectedDomainIndex: -1,
      previewIndex: -1,
      tabIndexInPreview: 0,
      focusOnNewElement: false,
      domainPreview: {
        header: '',
        content: [],
      },
    };

    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleDomainPreviewNext = this.handleDomainPreviewNext.bind(this);
    this.handleDomainPreviewPrevious = this.handleDomainPreviewPrevious.bind(
      this
    );
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
  }

  handleIconClick(realm) {
    sessionStorage.setItem(CURRENT_DOMAIN_NAME, realm);
    this.props.history.push('./manage-domain');
  }

  componentDidUpdate() {
    const { focusOnNewElement } = this.state;
    if (this.newElement && focusOnNewElement) {
      this.newElement.focus();
      this.setState({ focusOnNewElement: false });
    }
  }

  componentWillMount() {
    this.loadDomainList();
  }

  loadDomainList() {
    const { dispatch } = this.props;
    dispatch(loadDomains()).then(() => {
      const { dispatch, domainList } = this.props;
      domainList.map(realm => {
        realm.oldRealmName = realm.realm;
        dispatch(getUser(domainList, realm.realm));
        dispatch(getClient(domainList, realm.realm));
        dispatch(getRole(domainList, realm.realm));
        return realm;
      });

      this.setState({ domainList });
    });
  }

  confirmDelete(index) {
    const { domainList } = this.state;
    const domain = domainList[index];

    if (domain.id.length === 0) {
      this.removeRealm(index);
    } else {
      this.setState({
        selectedDomainIndex: index,
        deleteModalVisible: true,
      });
    }
  }

  cancelDelete() {
    this.setState({
      selectedDomainIndex: -1,
      deleteModalVisible: false,
    });
  }

  removeRealm(i) {
    const { domainList } = this.state;
    const domain = domainList[i];
    if (!!domain.id && domain.id.length > 0) {
      this.props.dispatch(handleRealmDeletion(domain.oldRealmName)).then(() => {
        this.setState({
          selectedDomainIndex: -1,
          deleteModalVisible: false,
        });

        domainList.splice(i, 1);
        this.setState({ domainList });
      });
    } else {
      domainList.splice(i, 1);
      this.setState({ domainList });
    }
  }

  addNewDomain() {
    const { domainList } = this.state;
    const domain = {
      id: '',
      realm: '',
      isInFocus: true,
      clients: [],
      roles: [],
      users: [],
    };
    if (domainList.length === 0) {
      domainList[0] = domain;
    } else if (
      !!domainList[0] &&
      !!domainList[0].id &&
      domainList[0].id.length > 0
    ) {
      domainList.splice(0, 0, domain);
    }
    this.setState({ focusOnNewElement: true });
    this.setState({ domainList });
  }

  handleOnSave(index, realm) {
    const { dispatch } = this.props;

    let domains = this.state.domainList.filter(_realm => {
      return _realm.realm === realm.realm;
    });

    if (realm.id && realm.id.length > 0) {
      if (domains.length === 1) {
        let newDomain = {
          realm: realm.realm,
        };
        dispatch(updateDomain(realm.oldRealmName, newDomain)).then(() => {
          const { domainList } = this.state;
          const { isError } = this.props;
          let domain = domainList[index];
          domain.realm = newDomain.realm;
          domain.oldRealmName = newDomain.realm;
          domain.isSaved = !isError;
          domain.isDirty = isError;
          if (!isError) {
            this.setState({ domainList });
          } else {
            this.setState({ duplicateModalVisible: true });
          }
        });
      } else {
        this.setState({ duplicateModalVisible: true });
      }
    } else {
      let newDomain = {
        realm: realm.realm,
        enabled: true,
      };

      if (domains.length === 1) {
        dispatch(saveDomain(newDomain)).then(() => {
          const { domainList } = this.state;
          const { isError } = this.props;
          let domain = {
            id: newDomain.realm,
            realm: newDomain.realm,
            oldRealmName: newDomain.realm,
            clients: [],
            roles: [],
            users: [],
            isSaved: !isError,
            isDirty: isError,
          };
          if (!isError) {
            domainList.splice(0, 1);
            domainList.unshift(domain);
            this.setState({ domainList });
          } else {
            this.setState({ duplicateModalVisible: true });
          }
        });
      } else {
        const { domainList } = this.state;
        this.setState({ duplicateModalVisible: true });
        domainList.forEach(domain => {
          if (domain.id === '') {
            domain.isInFocus = true;
          } else {
            domain.isInFocus = false;
          }
        });
        this.setState({ domainList });
      }
    }
  }

  ackDuplicate() {
    this.setState({ focusOnNewElement: true });
    this.setState({ duplicateModalVisible: false });

    if (this.newElement) {
      this.newElement.focus();
      this.setState({ focusOnNewElement: false });
    }
  }

  handleChange(index, value) {
    const { domainList } = this.state;
    const domain = domainList[index];
    domain.realm = value;
    domain.isSaved = false;
    if (domain.realm !== '' && domain.oldRealmName !== domain.realm) {
      domain.isDirty = true;
    } else {
      domain.isDirty = false;
    }
    domainList[index] = domain;
    this.setState({ selectedDomainIndex: index });
    this.setState({ domainList });
  }

  getDomainPreview(index, tabIndexInPreview) {
    const { domainList } = this.state;
    let { domainPreview } = this.state;
    let domain = domainList[index];

    if (tabIndexInPreview === 1) {
      let content = [];

      domain.roles.forEach(role => {
        content.push({ id: role.id, value: role.name });
      });
      domainPreview.content = content;
      domainPreview.header = `Roles (${domain.roles.length})`;
    } else if (tabIndexInPreview === 2) {
      let content = [];

      domain.users.forEach(user => {
        content.push({ id: user.id, value: user.username });
      });
      domainPreview.content = content;
      domainPreview.header = `Users (${domain.users.length})`;
    } else {
      let content = [];
      let spa = 0,
        api = 0,
        web = 0,
        others = 0;
      let typeSPA = CLIENT_TYPES[0];
      let typeAPI = CLIENT_TYPES[1];
      let typeWeb = CLIENT_TYPES[2];
      let otherApps = 'Others';

      domain.clients.forEach(client => {
        if (!!client.description && client.description === CLIENT_TYPES[0]) {
          spa++;
        } else if (
          !!client.description &&
          client.description === CLIENT_TYPES[1]
        ) {
          api++;
        } else if (
          !!client.description &&
          client.description === CLIENT_TYPES[2]
        ) {
          web++;
        } else {
          others++;
        }
      });
      /* eslint-disable no-unused-expressions */
      spa > 0
        ? spa > 1
          ? content.push({
              id: 0,
              value: `${typeSPA.substr(0, typeSPA.length - 6)} (${spa})`,
            })
          : content.push({
              id: 0,
              value: `${typeSPA.substr(0, typeSPA.length - 6)}`,
            })
        : null;
      api > 0
        ? api > 1
          ? content.push({
              id: 1,
              value: `${typeAPI.substr(0, typeAPI.length - 6)} (${api})`,
            })
          : content.push({
              id: 1,
              value: `${typeAPI.substr(0, typeAPI.length - 6)}`,
            })
        : null;
      web > 0
        ? web > 1
          ? content.push({
              id: 2,
              value: `${typeWeb.substr(0, typeWeb.length - 10)} (${web})`,
            })
          : content.push({
              id: 2,
              value: `${typeWeb.substr(0, typeWeb.length - 10)}`,
            })
        : null;
      others > 0
        ? others > 1
          ? content.push({ id: 3, value: `${otherApps} (${others})` })
          : content.push({ id: 3, value: `${otherApps}` })
        : null;
      /* eslint-enable no-unused-expressions */

      domainPreview.content = content;
      domainPreview.header = `Applications (${domain.clients.length})`;
    }

    return domainPreview;
  }

  handlePreviewClick(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview = 0;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({
      previewIndex: index,
      tabIndexInPreview,
      domainPreview,
    });
  }

  handleDomainPreviewPrevious(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview -= 1;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({ tabIndexInPreview, domainPreview });
  }

  handleDomainPreviewNext(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview += 1;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({ tabIndexInPreview, domainPreview });
  }

  render() {
    const { requesting } = this.props;
    const {
      domainList,
      previewIndex,
      tabIndexInPreview,
      domainPreview,
    } = this.state;
    const domains = domainList.filter(domain => {
      return domain.id && domain.id.length > 0;
    });

    if (domainList && domainList.length > 0) {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Projects</h1>
          <Card id="manageDomain" className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">
                {domains.length} PROJECTS
              </h3>
              <Button
                floating
                className="fa fa-2x ManageDomain__plus-icon"
                onClick={() => this.addNewDomain()}
              >
                add
              </Button>
            </div>
            <DataTable plain className="ManageDomainPage__domain-list">
              <TableBody>
                {domainList.map((realm, i) => {
                  return (
                    <Domain
                      index={i}
                      key={realm.id}
                      realm={realm}
                      clients={realm.clients ? realm.clients : []}
                      users={realm.users ? realm.users : []}
                      roles={realm.roles ? realm.roles : []}
                      handleIconClick={this.handleIconClick}
                      confirmDelete={this.confirmDelete}
                      handleChange={this.handleChange}
                      handleOnSave={this.handleOnSave}
                      domainPreview={domainPreview}
                      handlePreviewClick={this.handlePreviewClick}
                      handleDomainPreviewClose={() => {
                        this.setState({ previewIndex: -1 });
                      }}
                      handleDomainPreviewPrevious={
                        this.handleDomainPreviewPrevious
                      }
                      handleDomainPreviewNext={this.handleDomainPreviewNext}
                      previewIndex={previewIndex}
                      tabIndexInPreview={tabIndexInPreview}
                      inputRef={el => (this.newElement = el)}
                    />
                  );
                })}
              </TableBody>
            </DataTable>
          </Card>
          <DialogContainer
            id="deleteModal"
            height="250px"
            width="350px"
            visible={this.state.deleteModalVisible}
            title="Delete Project"
            onHide={() => {
              this.setState({ deleteModalVisible: false });
            }}
            aria-describedby="deleteModalDescription"
          >
            <p id="deleteModalDescription">
              {DELETE_DOMAIN_WARNING_MESSAGE}
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                className="ManageDomain__button-delete-yes"
                flat
                onClick={() => {
                  this.removeRealm(this.state.selectedDomainIndex);
                }}
              >
                YES
              </Button>
              <Button
                className="ManageDomain__button-delete-no"
                flat
                onClick={() => {
                  this.cancelDelete();
                }}
              >
                NO
              </Button>
            </p>
          </DialogContainer>
          <DialogContainer
            id="addModal"
            height="250px"
            width="350px"
            visible={this.state.duplicateModalVisible}
            title="Domain Unavailable"
            onHide={() => {
              this.setState({ duplicateModalVisible: false });
            }}
            aria-describedby="addModalDescription"
          >
            <p id="addModalDescription">
              {DUPLICATE_DOMAIN_MESSAGE}
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                className="ManageDomain__button-delete-yes"
                flat
                onClick={() => this.ackDuplicate()}
              >
                Okay
              </Button>
            </p>
          </DialogContainer>
        </div>
      );
    } else if (!requesting) {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Projects</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">0 PROJECTS</h3>
              <Button
                floating
                className="fa fa-2x ManageDomain__plus-icon"
                onClick={() => this.addNewDomain()}
              >
                add
              </Button>
              <h1 className="ManageDomainPage__no-domain">
                Looks like there are no domains here{' '}
              </h1>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Projects</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">0 PROJECTS</h3>
              <Button floating className="fa fa-plus ManageDomain__plus-icon" />
            </div>
            <div className="ManageDomain__spinner-div">
              <SyncLoader color={'#BC477B'} loading={true} />
            </div>
          </Card>
        </div>
      );
    }
  }
}

ManageDomain.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  domainList: PropTypes.array,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    domainList: state.domain.domainList,
    requesting: state.domain.requesting,
    isError: state.domain.isError,
    errorMessage: state.domain.errorMessage,
  };
}

export default connect(mapStateToProps)(ManageDomain);
