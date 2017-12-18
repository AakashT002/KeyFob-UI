import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import {
  Card,
  TabsContainer,
  Tabs,
  Tab,
  Button,
  FontIcon,
  DialogContainer,
} from 'react-md';
import PropTypes from 'prop-types';
import { fetchUsers, addBlankUser } from '../store/users/action';
import {
  handleUserCreation,
  handleUserDeletion,
  handleUserUpdate,
} from '../store/addUser/action';

import ClientForm from '../components/ClientForm';
import TeamForm from '../components/TeamForm';
import UserWidget from '../components/UserWidget';
import {
  loadClients,
  saveClient,
  addClient,
  updateClient,
  handleClientDeletion,
  stopClientSpinner,
} from '../store/client/action';
import { loadTeams, handleTeamDeletion } from '../store/team/action';

import {
  loadRoles,
  saveRole,
  handleRoleDeletion,
  stopRoleSpinner,
} from '../store/roles/action';

import {
  CURRENT_DOMAIN_NAME,
  IGNORED_CLIENTS,
  IGNORED_ROLES,
  CLIENT_TYPES,
  DELETE_ROLE_MESSAGE,
  DELETE_CLIENT_MESSAGE,
  DELETE_USER_MESSAGE,
  DELETE_TEAM_MESSAGE,
} from '../utils/constants';

import Roles from '../components/Roles';
import '../assets/stylesheets/DomainPage.css';

class DomainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdomainName: sessionStorage.getItem(CURRENT_DOMAIN_NAME),
      activeTab: this.props.activeTab || 0,
      clients: [],
      roles: [],
      users: [],
      teams: [],
      checkIcon: false,
      focusOnNewElement: false,
      deleteObj: {
        selectedId: '',
        selectedIndex: -1,
        deleteModalVisible: false,
      },
      isChecked: false,
      counter: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRoleSave = this.onRoleSave.bind(this);
    this.renderFeedbackMessage = this.renderFeedbackMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  getMaxTabs() {
    return this.state.currentdomainName === 'master' ? 2 : 3;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers(this.state.currentdomainName)).then(() => {
      let existingUsers = [];
      const { users } = this.props;
      users.forEach(user => {
        let userObj = {
          username: user.username,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: 'password',
            },
          ],
          isUserSaved: true,
          showAsSaved: false,
          id: user.id,
        };
        existingUsers = existingUsers.concat([userObj]);
      });
      this.setState({ users: existingUsers });
    });

    dispatch(loadClients(this.state.currentdomainName)).then(() => {
      let clients = [];
      const { clientList } = this.props;

      clientList.forEach(client => {
        if (!IGNORED_CLIENTS.includes(client.clientId.toString())) {
          if (this.state.currentdomainName === 'master') {
            if (
              client.clientId.substr(client.clientId.length - 6, 6) ===
                '-realm' &&
              client.clientId !== 'master-realm'
            ) {
              let clientObj = {
                clientId: client.clientId,
                rootUrl: client.rootUrl || '',
                description: client.description || '',
                redirectUris: client.redirectUris,
                webOrigins: client.webOrigins,
                implicitFlowEnabled: client.implicitFlowEnabled,
                directAccessGrantsEnabled: client.directAccessGrantsEnabled,
                bearerOnly: client.bearerOnly,
                consentRequired: client.consentRequired,
                publicClient: client.publicClient,
                protocol: client.protocol,
                standardFlowEnabled: client.standardFlowEnabled,
                id: client.id,
                showAsSaved: false,
                isClientSaved: true,
              };
              clients = clients.concat([clientObj]);
            }
          } else {
            let clientObj = {
              clientId: client.clientId,
              rootUrl: client.rootUrl || '',
              description: client.description || '',
              redirectUris: client.redirectUris,
              webOrigins: client.webOrigins,
              implicitFlowEnabled: client.implicitFlowEnabled,
              directAccessGrantsEnabled: client.directAccessGrantsEnabled,
              bearerOnly: client.bearerOnly,
              consentRequired: client.consentRequired,
              publicClient: client.publicClient,
              protocol: client.protocol,
              standardFlowEnabled: client.standardFlowEnabled,
              id: client.id,
              showAsSaved: false,
              isClientSaved: true,
            };
            clients = clients.concat([clientObj]);
          }
        }
      });

      this.setState({ clients });
      dispatch(stopClientSpinner());
    });

    dispatch(loadRoles(this.state.currentdomainName)).then(() => {
      let { roleList } = this.props;
      let roles = [];
      for (var j = 0; j < roleList.length; j++) {
        if (!IGNORED_ROLES.includes(roleList[j].name.toString())) {
          let roleObj = {
            id: roleList[j].id,
            name: roleList[j].name,
          };
          roles = roles.concat([roleObj]);
        }
      }
      this.setState({ roles });
      dispatch(stopRoleSpinner());
    });

    dispatch(loadTeams(this.state.currentdomainName)).then(() => {
      let { teamList } = this.props;
      let teams = [];
      for (var j = 0; j < teamList.length; j++) {
        let teamObj = {
          id: teamList[j].id,
          name: teamList[j].name,
          domains: [],
        };
        teams = teams.concat([teamObj]);
      }
      this.setState({ teams });
    });
  }

  componentDidUpdate() {
    const { activeTab, focusOnNewElement } = this.state;

    if (this.clientElement && activeTab === 0 && focusOnNewElement) {
      this.clientElement.focus();
      this.setState({ focusOnNewElement: false });
    }

    if (this.userElement && activeTab === 2 && focusOnNewElement) {
      this.userElement.focus();
      this.setState({ focusOnNewElement: false });
    }

    if (this.roleElement && activeTab === 1 && focusOnNewElement) {
      this.roleElement.focus();
      this.setState({ focusOnNewElement: false });
    }
  }

  handleChange(value, i) {
    const { roles } = this.state;
    let role = roles[i];
    role.name = value;
    roles[i] = role;
    this.setState({ roles });
    this.setState({ checkIcon: false });
  }

  handleTabChange(index) {
    this.setState({ activeTab: index });
  }

  isMasterDomain() {
    return this.state.currentdomainName === 'master' ? true : false;
  }

  handlePlusClick() {
    const { clients, roles } = this.state;
    this.setState({ focusOnNewElement: true });

    if (this._isClientsTab()) {
      if (
        this.state.clients.length === 0 ||
        this.state.clients[0].id !== undefined
      ) {
        this.props.dispatch(addClient()).then(() => {
          var client = {
            clientId: '',
            rootUrl: '',
            redirectUris: [],
            webOrigins: [],
            description: '',
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: true,
            bearerOnly: false,
            consentRequired: false,
            publicClient: true,
            protocol: 'openid-connect',
            standardFlowEnabled: true,
            isClientSaved: this.props.isClientSaved,
            showAsSaved: false,
          };
          clients.splice(0, 0, client);
          clients.forEach(client => {
            client.showAsSaved = false;
          });
          this.setState({ clients });
        });
      }
    } else if (this._isRolesTab()) {
      let role = {
        id: '',
        name: '',
        isDirty: true,
        disableButton: '',
      };

      if (roles.length === 0) {
        roles.splice(0, 0, role);
        this.setState({ roles });
      } else if (roles[0].id.length > 0) {
        roles.splice(0, 0, role);
        this.setState({ roles });
      }
    } else if (this._isUsersTab()) {
      this.props
        .dispatch(addBlankUser(this.state.currentdomainName))
        .then(() => {
          this.setState({ users: this.props.users });
        });
    } else if (this._isTeamsTab()) {
      this.setState({ teams: [] }); // TODO : Pending...
    }
  }

  handleFieldChange(name, value, i) {
    this.setState(() => {
      let currClients = this.state.clients;
      let newClient = this.state.clients[i];

      if (name === 'rootUrl') {
        newClient['redirectUris'] = [`${value}/*`];
        newClient['webOrigins'] = [`${value}`];
      }
      newClient[name] = value;
      newClient.isClientSaved = false;

      if (name === 'description' && value === CLIENT_TYPES[1]) {
        newClient['standardFlowEnabled'] = false;
      } else if (name === 'description' && value !== CLIENT_TYPES[1]) {
        newClient['standardFlowEnabled'] = true;
      }
      currClients[i] = newClient;
      currClients.forEach(client => {
        client.showAsSaved = false;
      });
      return {
        clients: currClients,
      };
    });
  }

  onClientSave(index) {
    var clientObject = Object.assign({}, this.state.clients[index]);
    var id = clientObject.id;
    delete clientObject['isClientSaved'];
    delete clientObject['id'];
    delete clientObject['showAsSaved'];
    if (id !== undefined) {
      this.props.dispatch(updateClient(clientObject, id)).then(() => {
        let clients = this.state.clients;
        let currentclient = clients[index];
        currentclient.isClientSaved = true;
        currentclient.showAsSaved = true;
        this.setState({ clients });
      });
    } else {
      this.props.dispatch(saveClient(clientObject)).then(() => {
        let clients = this.state.clients;
        let currentclient = clients[index];
        currentclient.isClientSaved = true;
        currentclient.showAsSaved = true;
        if (!this.props.isError) {
          currentclient.id = this.props.clientId;
        }
        this.setState({ clients });
      });
    }
  }

  validateClientForm(index) {
    return (
      this.validatePresence(this.state.clients[index].clientId) &&
      this.validatePresence(this.state.clients[index].rootUrl) &&
      this.validatePresence(this.state.clients[index].description)
    );
  }

  validatePresence(value) {
    return value && value.toString().length > 0;
  }

  renderFeedbackMessage(index) {
    const { showMessageForRole } = this.props;
    const { checkIcon } = this.state;
    if (index === 0 && checkIcon === true) {
      if (showMessageForRole === 'Registered') {
        return (
          <div className="DomainPage__icon">
            <FontIcon
              iconClassName="fa fa-check-circle-o"
              className="DomainPage__green"
            />
            <span className="DomainPage__message-green">Saved</span>
          </div>
        );
      } else {
        return (
          <div className="DomainPage__icon">
            <FontIcon
              iconClassName="fa fa-times-circle-o"
              className="DomainPage__red"
            />
            <span className="DomainPage__message-red">Role Already Exists</span>
          </div>
        );
      }
    }
  }

  onRoleSave(index) {
    const { roles } = this.state;
    if (roles[index].name !== '') {
      var roleObject = {
        name: this.state.roles[index].name,
      };
    }
    this.props
      .dispatch(saveRole(roleObject, this.state.currentdomainName))
      .then(() => {
        if (this.props.saving === true) {
          roles[index].id = this.props.roleId;
        }
        roles[index].isDirty = false;
        roles[index].disableButton = this.props.saving;
        this.setState({ roles });
        this.setState({ checkIcon: true });
      });
  }

  handleDelete(index, id) {
    const deleteObj = this.state.deleteObj;
    deleteObj.selectedId = id;
    deleteObj.selectedIndex = index;
    if (id !== undefined && id !== '') {
      deleteObj.deleteModalVisible = true;
    } else {
      deleteObj.deleteModalVisible = false;
    }
    this.setState({ deleteObj });
    if (id === undefined || id === '') {
      this.remove(deleteObj);
    }
  }

  _removeClient(index) {
    const { clients } = this.state;
    this.resetDeleteObj();
    clients.splice(index, 1);
    this.setState({ clients });
  }

  _removeRole(index) {
    const { roles } = this.state;
    this.resetDeleteObj();
    roles.splice(index, 1);
    this.setState({ roles });
  }

  _removeUser(index) {
    const { users } = this.state;
    this.resetDeleteObj();
    users.splice(index, 1);
    this.setState({ users });
  }

  _removeTeam(index) {
    const { teams } = this.state;
    this.resetDeleteObj();
    teams.splice(index, 1);
    this.setState({ teams });
  }

  _isClientsTab() {
    const { activeTab } = this.state;
    return !this.isMasterDomain() && activeTab === 0;
  }

  _isTeamsTab() {
    const { activeTab } = this.state;
    return this.isMasterDomain() && activeTab === 0;
  }

  _isRolesTab() {
    const { activeTab } = this.state;
    return !this.isMasterDomain() && activeTab === 1;
  }

  _isUsersTab() {
    const { activeTab } = this.state;
    return (
      (this.isMasterDomain() && activeTab === 1) ||
      (!this.isMasterDomain() && activeTab === 2)
    );
  }

  remove(deleteObj) {
    const index = deleteObj.selectedIndex;
    const id = deleteObj.selectedId;
    const currentdomainName = this.state.currentdomainName;

    if (this._isClientsTab()) {
      if (id && id !== '') {
        this.props
          .dispatch(handleClientDeletion(id, currentdomainName))
          .then(this._removeClient(index));
      } else {
        this._removeClient(index);
      }
    } else if (this._isRolesTab()) {
      if (id && id !== '') {
        this.props
          .dispatch(handleRoleDeletion(id, currentdomainName))
          .then(this._removeRole(index));
      } else {
        this._removeRole(index);
      }
    } else if (this._isUsersTab()) {
      if (id && id !== '') {
        this.props
          .dispatch(handleUserDeletion(currentdomainName, id))
          .then(this._removeUser(index));
      } else {
        this._removeUser(index);
      }
    } else if (this._isTeamsTab()) {
      if (id && id !== '') {
        this.props
          .dispatch(handleTeamDeletion(currentdomainName, id))
          .then(this._removeTeam(index));
      } else {
        this._removeTeam(index);
      }
    }
  }

  resetDeleteObj() {
    const newObj = this.state.deleteObj;
    newObj.selectedId = '';
    newObj.selectedIndex = 0;
    newObj.deleteModalVisible = false;
    this.setState({
      deleteObj: newObj,
    });
    return newObj;
  }

  cancelDelete() {
    const newObj = this.state.deleteObj;
    newObj.selectedId = '';
    newObj.selectedIndex = -1;
    newObj.deleteModalVisible = false;
    this.setState({
      deleteObj: newObj,
    });
  }

  renderTeamsTab() {
    const { teams } = this.state;
    return (
      <Tab label="TEAMS" className="DomainPage__roles-tab">
        {teams.length > 0 ? (
          teams.map((team, i) => (
            <TeamForm
              key={team.id}
              index={i}
              team={team}
              confirmTeamDelete={this.handleDelete}
              handleDomainChange={(value, domainName, domainId, userIndex) =>
                this.handleDomainChange(value, domainName, domainId, userIndex)
              }
              domains={this.state.clients}
            />
          ))
        ) : (
          <div className="DomainPage__teams--no-data">No Teams Added Yet</div>
        )}
      </Tab>
    );
  }

  renderClientsTab() {
    const { clients } = this.state;
    const { loadingClients } = this.props;
    return (
      <Tab label="CLIENTS" className="DomainPage__clients-tab">
        {loadingClients ? (
          <span className="DomainPage__spinner-span">
            <SyncLoader color={'#BC477B'} loading={true} />
          </span>
        ) : clients.length !== 0 ? (
          clients.map((client, i) => (
            <ClientForm
              key={i}
              index={i}
              client={client}
              handleFieldChange={(name, value) =>
                this.handleFieldChange(name, value, i)
              }
              handleSave={this.onClientSave.bind(this)}
              validateClientForm={this.validateClientForm.bind(this)}
              isClientSaved={this.state.clients[i].isClientSaved}
              showAsSaved={this.state.clients[i].showAsSaved}
              isError={this.props.isError}
              feedbackMessage={this.props.feedbackMessage}
              inputRef={el => (this.clientElement = el)}
              confirmClientDelete={this.handleDelete}
            />
          ))
        ) : (
          <div className="DomainPage__clients-msg">No Clients Added Yet</div>
        )}
      </Tab>
    );
  }

  renderRolesTab() {
    const { roles } = this.state;
    const { loadingRoles } = this.props;

    return (
      <Tab label="ROLES" className="DomainPage__roles-tab">
        {loadingRoles ? (
          <span className="DomainPage__spinner-span">
            <SyncLoader color={'#BC477B'} loading={true} />
          </span>
        ) : roles.length > 0 ? (
          roles.map((role, i) => (
            <Roles
              key={role.id}
              index={i}
              roleId={role.id}
              roleName={role.name}
              renderFeedbackMessage={this.renderFeedbackMessage}
              disableButton={role.disableButton}
              isDirty={role.isDirty}
              handleChange={this.handleChange}
              onRoleSave={this.onRoleSave}
              focusOnText={this.focusOnText}
              blurOnText={this.blurOnText}
              inputRef={el => (this.roleElement = el)}
              confirmRoleDelete={this.handleDelete}
            />
          ))
        ) : (
          <div>
            <h1 className="DomainPage__roles--no-data">No Roles Added Yet</h1>
          </div>
        )}
      </Tab>
    );
  }

  renderUsersTab() {
    const { users } = this.state;
    return (
      <Tab label="USERS" className="DomainPage__users-tab">
        {users.length !== 0 ? (
          users.map((user, i) => (
            <UserWidget
              key={i}
              index={i}
              user={user}
              handleUserFieldChange={(name, value) =>
                this.handleUserFieldChange(name, value, i)
              }
              removeUser={i => this.removeUser(i)}
              validateUserForm={this.validateUserForm.bind(this)}
              saveUser={() => this.onUserSave(i)}
              roles={this.state.roles}
              isUserSaved={this.state.users[i].isUserSaved}
              showAsSaved={this.state.users[i].showAsSaved}
              isErrorForUser={this.props.isErrorForUser}
              UserFeedbackMessage={this.props.UserFeedbackMessage}
              handleRoleChange={(value, value_one, value_two, value_three, i) =>
                this.handleRoleChange(
                  value,
                  value_one,
                  value_two,
                  value_three,
                  i
                )
              }
              confirmUserDelete={this.handleDelete}
              inputRef={el => (this.userElement = el)}
              ischecked={this.state.ischecked}
              counter={this.state.counter}
            />
          ))
        ) : (
          <div className="DomainPage__users-msg">No Users Added Yet</div>
        )}
      </Tab>
    );
  }

  renderApplicationTabs() {
    return (
      <Tabs tabId="domain-tab" className="DomainPage__tabs">
        {this.renderClientsTab()}
        {this.renderRolesTab()}
        {this.renderUsersTab()}
      </Tabs>
    );
  }

  renderMasterDomainTabs() {
    return (
      <Tabs tabId="domain-tab" className="DomainPage__tabs">
        {this.renderTeamsTab()}
        {this.renderUsersTab()}
      </Tabs>
    );
  }

  determineModalMessage() {
    if (this._isTeamsTab()) {
      return DELETE_TEAM_MESSAGE;
    } else if (this._isClientsTab()) {
      return DELETE_CLIENT_MESSAGE;
    } else if (this._isRolesTab()) {
      return DELETE_ROLE_MESSAGE;
    } else if (this._isUsersTab()) {
      return DELETE_USER_MESSAGE;
    }
  }

  determineTitle() {
    if (this._isTeamsTab()) {
      return 'Remove Team';
    } else if (this._isClientsTab()) {
      return 'Remove Client';
    } else if (this._isRolesTab()) {
      return 'Remove Role';
    } else if (this._isUsersTab()) {
      return 'Remove User';
    }
  }

  handleUserFieldChange(name, value, i) {
    this.setState(() => {
      let existingUsers = this.state.users;
      let newUser = existingUsers[i];
      newUser[name] = value;
      newUser.isUserSaved = false;
      existingUsers[i] = newUser;
      existingUsers.forEach(user => {
        user.showAsSaved = false;
      });
      return {
        users: existingUsers,
      };
    });
  }

  handleRoleChange(value, check, roleName, index, i) {
    const { counter } = this.state;
    if (check) {
      this.setState(() => {
        let existingUsers = this.state.users;
        let newUser = existingUsers[index];
        newUser['realmRoles'].push(roleName);
        return {
          counter: counter + 1,
          users: existingUsers,
        };
      });
    } else {
      this.setState(() => {
        let existingUsers = this.state.users;
        let newUser = existingUsers[index];
        newUser['realmRoles'].splice(i, 1);
        return {
          counter: counter - 1,
          users: existingUsers,
        };
      });
    }
  }

  handleDomainChange(value, domainName, domainId, index) {
    if (value) {
      this.setState(() => {
        let existingTeams = this.state.teams;
        let team = existingTeams[index];
        let found = false;
        if (team.domains.length > 0) {
          for (var r = 0; r < team.domains.length; r++) {
            if (team.domains[r].id === domainId) {
              found = true;
              break;
            }
          }
          if (!found) {
            team.domains.push({ id: domainId, name: domainName });
          }
        } else {
          team.domains.push({ id: domainId, name: domainName });
        }
        return {
          teams: existingTeams,
        };
      });
    } else {
      this.setState(() => {
        let existingTeams = this.state.teams;
        let team = existingTeams[index];
        let _foundAt = -1;
        if (team.domains.length > 0) {
          for (var r = 0; r < team.domains.length; r++) {
            if (team.domains[r].id === domainId) {
              _foundAt = r;
              break;
            }
          }
          if (_foundAt >= 0) {
            team.domains.splice(_foundAt, 1);
          }
        }
        return {
          teams: existingTeams,
        };
      });
    }
  }

  // checkDomains(index) {
  //   const client = this.state.clients[index];
  //   const realm = sessionStorage.getItem(CURRENT_DOMAIN_NAME);

  //   if (client.domains.length > 0) {
  //     this.props.dispatch(
  //       handleUserRoleAssignment(realm, client.id, client.domains)
  //     );
  //   }
  // }

  onUserSave(index) {
    const realm = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    var userObject = Object.assign({}, this.state.users[index]);
    var id = userObject.id;
    delete userObject['isUserSaved'];
    delete userObject['id'];
    delete userObject['showAsSaved'];
    if (id !== undefined) {
      this.props.dispatch(handleUserUpdate(realm, userObject, id)).then(() => {
        let users = this.state.users;
        let currentuser = users[index];
        currentuser.isUserSaved = true;
        currentuser.showAsSaved = true;
        this.setState({ users });
      });
    } else {
      this.props.dispatch(handleUserCreation(realm, userObject)).then(() => {
        let users = this.state.users;
        let currentuser = users[index];
        currentuser.isUserSaved = true;
        currentuser.showAsSaved = true;
        if (!this.props.isErrorForUser) {
          currentuser.id = this.props.userId;
        }
        this.setState({ users });
      });
    }
  }

  validateUserForm(index) {
    return this.validatePresence(this.state.users[index].username);
  }

  render() {
    const { activeTab } = this.state;
    let applicableTabs = null;
    if (this.state.currentdomainName === 'master') {
      applicableTabs = this.renderMasterDomainTabs();
    } else {
      applicableTabs = this.renderApplicationTabs();
    }
    return (
      <div className="DomainPage">
        <h1 className="DomainPage__domain-name">
          {this.state.currentdomainName !== null &&
            this.state.currentdomainName}
        </h1>
        <Card className="card-centered">
          <TabsContainer
            panelClassName="md-grid"
            activeTabIndex={activeTab}
            onTabChange={this.handleTabChange}
          >
            {applicableTabs}
          </TabsContainer>
          <div className="DomainPage__navigate">
            <hr className="DomainPage__line" />
            <Button
              flat
              disabled={activeTab === 0}
              key="previous"
              label="Previous"
              className="DomainPage__button-prev"
              onClick={() => this.setState({ activeTab: activeTab - 1 })}
            >
              keyboard_arrow_left
            </Button>
            <Button
              flat
              disabled={activeTab === this.getMaxTabs() - 1}
              key="next"
              label="Next"
              iconBefore={false}
              className="DomainPage__button-next"
              onClick={() => this.setState({ activeTab: activeTab + 1 })}
            >
              keyboard_arrow_right
            </Button>
          </div>
        </Card>
        <DialogContainer
          id="deleteModal-roles"
          dialogClassName="deleteModal-modal"
          visible={this.state.deleteObj.deleteModalVisible}
          title={this.determineTitle()}
          onHide={() => {
            const newObj = this.state.deleteObj;
            newObj.selectedId = '';
            newObj.selectedIndex = -1;
            newObj.deleteModalVisible = false;
            this.setState({
              deleteObj: newObj,
            });
          }}
          aria-describedby="deleteModalDescription"
        >
          <br />
          <p id="deleteModalDescription">
            {this.determineModalMessage()}
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <Button
                className="DomainPage__roles--delete-no"
                flat
                onClick={() => {
                  this.cancelDelete();
                }}
              >
                <label className="DomainPage__roles--delete-label-no">NO</label>
              </Button>
            </div>
            <div>
              <Button
                className="DomainPage__roles--delete-yes"
                flat
                onClick={() => {
                  this.remove(this.state.deleteObj);
                }}
              >
                <label className="DomainPage__roles--delete-label-yes">
                  YES
                </label>
              </Button>
            </div>
          </p>
        </DialogContainer>
        <Button
          floating
          className="fa fa-2x DomainPage__plus-icon"
          onClick={this.handlePlusClick}
        >
          add
        </Button>
      </div>
    );
  }
}

DomainPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  activeTab: PropTypes.number,
  loadingRoles: PropTypes.bool,
  loadingClients: PropTypes.bool,
  loading: PropTypes.bool,
  clientList: PropTypes.array,
  roleList: PropTypes.array,
  teamList: PropTypes.array,
  isClientSaved: PropTypes.bool,
  isError: PropTypes.bool,
  feedbackMessage: PropTypes.string,
  clientId: PropTypes.string,
  saving: PropTypes.bool,
  showMessageForRole: PropTypes.string,
  roleId: PropTypes.string,
  users: PropTypes.array,
  isErrorForUser: PropTypes.bool,
  UserFeedbackMessage: PropTypes.string,
  isUserSaved: PropTypes.bool,
  userId: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: state.domain.loading,
    loadingClients: state.client.requesting,
    clientList: state.client.clientList,
    loadingRoles: state.role.requesting,
    roleList: state.role.roleList,
    teamList: state.team.teamList,
    isClientSaved: state.client.isClientSaved,
    isError: state.client.isError,
    feedbackMessage: state.client.feedbackMessage,
    clientId: state.client.clientId,
    saving: state.role.saving,
    showMessageForRole: state.role.showMessageForRole,
    roleId: state.role.roleId,
    users: state.users.users,
    isErrorForUser: state.addUser.isErrorForUser,
    UserFeedbackMessage: state.addUser.UserFeedbackMessage,
    isUserSaved: state.addUser.isUserSaved,
    userId: state.addUser.userId,
  };
}

export default connect(mapStateToProps)(DomainPage);
