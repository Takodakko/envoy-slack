
const setupComplete = async (req, res) => {
    
    //Slack tokens are available in req.envoy.payload after oauthing with slack from envoy
        //This is due to envoy adding the payload after a hitting the validation url
    //SAVE TOKENS
    console.log(req.envoy)
    //console.log(req.envoy.body.meta.config)
    //console.log(req.envoy.body)

    // console.log(req.webClientBot)
    // console.log(req.webClientUser)
    res.status(200).send({})
}

const completeSetup = {  
    path: '/complete-setup',
    method: ['POST'],
    handler: setupComplete
};

module.exports = { completeSetup };

/* req.webClientUser =
WebClient {
  _events: Events <[Object: null prototype] {}> {},
  _eventsCount: 0,
  admin: {
    apps: {
      approve: [Function: bound apiCall] AsyncFunction,
      approved: [Object],
      clearResolution: [Function: bound apiCall] AsyncFunction,
      requests: [Object],
      restrict: [Function: bound apiCall] AsyncFunction,
      restricted: [Object],
      uninstall: [Function: bound apiCall] AsyncFunction
    },
    auth: { policy: [Object] },
    barriers: {
      create: [Function: bound apiCall] AsyncFunction,
      delete: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction
    },
    conversations: {
      archive: [Function: bound apiCall] AsyncFunction,
      convertToPrivate: [Function: bound apiCall] AsyncFunction,
      create: [Function: bound apiCall] AsyncFunction,
      delete: [Function: bound apiCall] AsyncFunction,
      disconnectShared: [Function: bound apiCall] AsyncFunction,
      ekm: [Object],
      getConversationPrefs: [Function: bound apiCall] AsyncFunction,
      getTeams: [Function: bound apiCall] AsyncFunction,
      invite: [Function: bound apiCall] AsyncFunction,
      rename: [Function: bound apiCall] AsyncFunction,
      restrictAccess: [Object],
      getCustomRetention: [Function: bound apiCall] AsyncFunction,
      setCustomRetention: [Function: bound apiCall] AsyncFunction,
      removeCustomRetention: [Function: bound apiCall] AsyncFunction,
      search: [Function: bound apiCall] AsyncFunction,
      setConversationPrefs: [Function: bound apiCall] AsyncFunction,
      setTeams: [Function: bound apiCall] AsyncFunction,
      unarchive: [Function: bound apiCall] AsyncFunction
    },
    emoji: {
      add: [Function: bound apiCall] AsyncFunction,
      addAlias: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      rename: [Function: bound apiCall] AsyncFunction
    },
    inviteRequests: {
      approve: [Function: bound apiCall] AsyncFunction,
      approved: [Object],
      denied: [Object],
      deny: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction
    },
    teams: {
      admins: [Object],
      create: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      owners: [Object],
      settings: [Object]
    },
    usergroups: {
      addChannels: [Function: bound apiCall] AsyncFunction,
      addTeams: [Function: bound apiCall] AsyncFunction,
      listChannels: [Function: bound apiCall] AsyncFunction,
      removeChannels: [Function: bound apiCall] AsyncFunction
    },
    users: {
      assign: [Function: bound apiCall] AsyncFunction,
      invite: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      session: [Object],
      unsupportedVersions: [Object],
      setAdmin: [Function: bound apiCall] AsyncFunction,
      setExpiration: [Function: bound apiCall] AsyncFunction,
      setOwner: [Function: bound apiCall] AsyncFunction,
      setRegular: [Function: bound apiCall] AsyncFunction
    }
  },
  api: { test: [Function: bound apiCall] AsyncFunction },
  apps: {
    connections: { open: [Function: bound apiCall] AsyncFunction },
    event: { authorizations: [Object] },
    uninstall: [Function: bound apiCall] AsyncFunction
  },
  auth: {
    revoke: [Function: bound apiCall] AsyncFunction,
    teams: { list: [Function: bound apiCall] AsyncFunction },
    test: [Function: bound apiCall] AsyncFunction
  },
  bots: { info: [Function: bound apiCall] AsyncFunction },
  bookmarks: {
    add: [Function: bound apiCall] AsyncFunction,
    edit: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  calls: {
    add: [Function: bound apiCall] AsyncFunction,
    end: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction,
    participants: {
      add: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction
    }
  },
  chat: {
    delete: [Function: bound apiCall] AsyncFunction,
    deleteScheduledMessage: [Function: bound apiCall] AsyncFunction,
    getPermalink: [Function: bound apiCall] AsyncFunction,
    meMessage: [Function: bound apiCall] AsyncFunction,
    postEphemeral: [Function: bound apiCall] AsyncFunction,
    postMessage: [Function: bound apiCall] AsyncFunction,
    scheduleMessage: [Function: bound apiCall] AsyncFunction,
    scheduledMessages: { list: [Function: bound apiCall] AsyncFunction },
    unfurl: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction
  },
  conversations: {
    acceptSharedInvite: [Function: bound apiCall] AsyncFunction,
    approveSharedInvite: [Function: bound apiCall] AsyncFunction,
    archive: [Function: bound apiCall] AsyncFunction,
    close: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    declineSharedInvite: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    inviteShared: [Function: bound apiCall] AsyncFunction,
    join: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    listConnectInvites: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    members: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  dialog: { open: [Function: bound apiCall] AsyncFunction },
  dnd: {
    endDnd: [Function: bound apiCall] AsyncFunction,
    endSnooze: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    setSnooze: [Function: bound apiCall] AsyncFunction,
    teamInfo: [Function: bound apiCall] AsyncFunction
  },
  emoji: { list: [Function: bound apiCall] AsyncFunction },
  files: {
    delete: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    revokePublicURL: [Function: bound apiCall] AsyncFunction,
    sharedPublicURL: [Function: bound apiCall] AsyncFunction,
    upload: [Function: bound apiCall] AsyncFunction,
    comments: { delete: [Function: bound apiCall] AsyncFunction },
    remote: {
      info: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      add: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      share: [Function: bound apiCall] AsyncFunction
    }
  },
  migration: { exchange: [Function: bound apiCall] AsyncFunction },
  oauth: {
    access: [Function: bound apiCall] AsyncFunction,
    v2: {
      access: [Function: bound apiCall] AsyncFunction,
      exchange: [Function: bound apiCall] AsyncFunction
    }
  },
  openid: {
    connect: {
      token: [Function: bound apiCall] AsyncFunction,
      userInfo: [Function: bound apiCall] AsyncFunction
    }
  },
  pins: {
    add: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  reactions: {
    add: [Function: bound apiCall] AsyncFunction,
    get: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  reminders: {
    add: [Function: bound apiCall] AsyncFunction,
    complete: [Function: bound apiCall] AsyncFunction,
    delete: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction
  },
  rtm: {
    connect: [Function: bound apiCall] AsyncFunction,
    start: [Function: bound apiCall] AsyncFunction
  },
  search: {
    all: [Function: bound apiCall] AsyncFunction,
    files: [Function: bound apiCall] AsyncFunction,
    messages: [Function: bound apiCall] AsyncFunction
  },
  stars: {
    add: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  team: {
    accessLogs: [Function: bound apiCall] AsyncFunction,
    billableInfo: [Function: bound apiCall] AsyncFunction,
    billing: { info: [Function: bound apiCall] AsyncFunction },
    info: [Function: bound apiCall] AsyncFunction,
    integrationLogs: [Function: bound apiCall] AsyncFunction,
    preferences: { list: [Function: bound apiCall] AsyncFunction },
    profile: { get: [Function: bound apiCall] AsyncFunction }
  },
  usergroups: {
    create: [Function: bound apiCall] AsyncFunction,
    disable: [Function: bound apiCall] AsyncFunction,
    enable: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction,
    users: {
      list: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction
    }
  },
  users: {
    conversations: [Function: bound apiCall] AsyncFunction,
    deletePhoto: [Function: bound apiCall] AsyncFunction,
    getPresence: [Function: bound apiCall] AsyncFunction,
    identity: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    lookupByEmail: [Function: bound apiCall] AsyncFunction,
    setPhoto: [Function: bound apiCall] AsyncFunction,
    setPresence: [Function: bound apiCall] AsyncFunction,
    profile: {
      get: [Function: bound apiCall] AsyncFunction,
      set: [Function: bound apiCall] AsyncFunction
    }
  },
  views: {
    open: [Function: bound apiCall] AsyncFunction,
    publish: [Function: bound apiCall] AsyncFunction,
    push: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction
  },
  workflows: {
    stepCompleted: [Function: bound apiCall] AsyncFunction,
    stepFailed: [Function: bound apiCall] AsyncFunction,
    updateStep: [Function: bound apiCall] AsyncFunction
  },
  channels: {
    archive: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    join: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  groups: {
    archive: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    createChild: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  im: {
    close: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction
  },
  mpim: {
    close: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction
  },
  token: undefined,
  slackApiUrl: 'https://slack.com/api/',
  retryConfig: { retries: 10, factor: 1.96821, randomize: true },
  requestQueue: PQueue {
    _events: Events <[Object: null prototype] {}> {},
    _eventsCount: 0,
    _intervalCount: 0,
    _intervalEnd: 0,
    _pendingCount: 0,
    _resolveEmpty: [Function: empty],
    _resolveIdle: [Function: empty],
    _carryoverConcurrencyCount: false,
    _isIntervalIgnored: true,
    _intervalCap: Infinity,
    _interval: 0,
    _queue: PriorityQueue { _queue: [] },
    _queueClass: [class PriorityQueue],
    _concurrency: 3,
    _intervalId: undefined,
    _timeout: undefined,
    _throwOnTimeout: false,
    _isPaused: false
  },
  tlsConfig: {},
  rejectRateLimitedCalls: false,
  teamId: undefined,
  logger: ConsoleLogger { level: 'info', name: 'web-api:WebClient:0' },
  axios: [Function: wrap] {
    request: [Function: wrap],
    getUri: [Function: wrap],
    delete: [Function: wrap],
    get: [Function: wrap],
    head: [Function: wrap],
    options: [Function: wrap],
    post: [Function: wrap],
    put: [Function: wrap],
    patch: [Function: wrap],
    defaults: {
      transitional: [Object],
      adapter: [Function: httpAdapter],
      transformRequest: [Array],
      transformResponse: [Array],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: [Function: validateStatus],
      headers: [Object],
      baseURL: 'https://slack.com/api/',
      maxRedirects: 0,
      proxy: false
    },
    interceptors: { request: [InterceptorManager], response: [InterceptorManager] },
    create: [Function: create]
  }
}
*/

/* req.webClientBot = 
WebClient {
  _events: Events <[Object: null prototype] {}> {},
  _eventsCount: 0,
  admin: {
    apps: {
      approve: [Function: bound apiCall] AsyncFunction,
      approved: [Object],
      clearResolution: [Function: bound apiCall] AsyncFunction,
      requests: [Object],
      restrict: [Function: bound apiCall] AsyncFunction,
      restricted: [Object],
      uninstall: [Function: bound apiCall] AsyncFunction
    },
    auth: { policy: [Object] },
    barriers: {
      create: [Function: bound apiCall] AsyncFunction,
      delete: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction
    },
    conversations: {
      archive: [Function: bound apiCall] AsyncFunction,
      convertToPrivate: [Function: bound apiCall] AsyncFunction,
      create: [Function: bound apiCall] AsyncFunction,
      delete: [Function: bound apiCall] AsyncFunction,
      disconnectShared: [Function: bound apiCall] AsyncFunction,
      ekm: [Object],
      getConversationPrefs: [Function: bound apiCall] AsyncFunction,
      getTeams: [Function: bound apiCall] AsyncFunction,
      invite: [Function: bound apiCall] AsyncFunction,
      rename: [Function: bound apiCall] AsyncFunction,
      restrictAccess: [Object],
      getCustomRetention: [Function: bound apiCall] AsyncFunction,
      setCustomRetention: [Function: bound apiCall] AsyncFunction,
      removeCustomRetention: [Function: bound apiCall] AsyncFunction,
      search: [Function: bound apiCall] AsyncFunction,
      setConversationPrefs: [Function: bound apiCall] AsyncFunction,
      setTeams: [Function: bound apiCall] AsyncFunction,
      unarchive: [Function: bound apiCall] AsyncFunction
    },
    emoji: {
      add: [Function: bound apiCall] AsyncFunction,
      addAlias: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      rename: [Function: bound apiCall] AsyncFunction
    },
    inviteRequests: {
      approve: [Function: bound apiCall] AsyncFunction,
      approved: [Object],
      denied: [Object],
      deny: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction
    },
    teams: {
      admins: [Object],
      create: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      owners: [Object],
      settings: [Object]
    },
    usergroups: {
      addChannels: [Function: bound apiCall] AsyncFunction,
      addTeams: [Function: bound apiCall] AsyncFunction,
      listChannels: [Function: bound apiCall] AsyncFunction,
      removeChannels: [Function: bound apiCall] AsyncFunction
    },
    users: {
      assign: [Function: bound apiCall] AsyncFunction,
      invite: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      session: [Object],
      unsupportedVersions: [Object],
      setAdmin: [Function: bound apiCall] AsyncFunction,
      setExpiration: [Function: bound apiCall] AsyncFunction,
      setOwner: [Function: bound apiCall] AsyncFunction,
      setRegular: [Function: bound apiCall] AsyncFunction
    }
  },
  api: { test: [Function: bound apiCall] AsyncFunction },
  apps: {
    connections: { open: [Function: bound apiCall] AsyncFunction },
    event: { authorizations: [Object] },
    uninstall: [Function: bound apiCall] AsyncFunction
  },
  auth: {
    revoke: [Function: bound apiCall] AsyncFunction,
    teams: { list: [Function: bound apiCall] AsyncFunction },
    test: [Function: bound apiCall] AsyncFunction
  },
  bots: { info: [Function: bound apiCall] AsyncFunction },
  bookmarks: {
    add: [Function: bound apiCall] AsyncFunction,
    edit: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  calls: {
    add: [Function: bound apiCall] AsyncFunction,
    end: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction,
    participants: {
      add: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction
    }
  },
  chat: {
    delete: [Function: bound apiCall] AsyncFunction,
    deleteScheduledMessage: [Function: bound apiCall] AsyncFunction,
    getPermalink: [Function: bound apiCall] AsyncFunction,
    meMessage: [Function: bound apiCall] AsyncFunction,
    postEphemeral: [Function: bound apiCall] AsyncFunction,
    postMessage: [Function: bound apiCall] AsyncFunction,
    scheduleMessage: [Function: bound apiCall] AsyncFunction,
    scheduledMessages: { list: [Function: bound apiCall] AsyncFunction },
    unfurl: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction
  },
  conversations: {
    acceptSharedInvite: [Function: bound apiCall] AsyncFunction,
    approveSharedInvite: [Function: bound apiCall] AsyncFunction,
    archive: [Function: bound apiCall] AsyncFunction,
    close: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    declineSharedInvite: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    inviteShared: [Function: bound apiCall] AsyncFunction,
    join: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    listConnectInvites: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    members: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  dialog: { open: [Function: bound apiCall] AsyncFunction },
  dnd: {
    endDnd: [Function: bound apiCall] AsyncFunction,
    endSnooze: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    setSnooze: [Function: bound apiCall] AsyncFunction,
    teamInfo: [Function: bound apiCall] AsyncFunction
  },
  emoji: { list: [Function: bound apiCall] AsyncFunction },
  files: {
    delete: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    revokePublicURL: [Function: bound apiCall] AsyncFunction,
    sharedPublicURL: [Function: bound apiCall] AsyncFunction,
    upload: [Function: bound apiCall] AsyncFunction,
    comments: { delete: [Function: bound apiCall] AsyncFunction },
    remote: {
      info: [Function: bound apiCall] AsyncFunction,
      list: [Function: bound apiCall] AsyncFunction,
      add: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction,
      remove: [Function: bound apiCall] AsyncFunction,
      share: [Function: bound apiCall] AsyncFunction
    }
  },
  migration: { exchange: [Function: bound apiCall] AsyncFunction },
  oauth: {
    access: [Function: bound apiCall] AsyncFunction,
    v2: {
      access: [Function: bound apiCall] AsyncFunction,
      exchange: [Function: bound apiCall] AsyncFunction
    }
  },
  openid: {
    connect: {
      token: [Function: bound apiCall] AsyncFunction,
      userInfo: [Function: bound apiCall] AsyncFunction
    }
  },
  pins: {
    add: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  reactions: {
    add: [Function: bound apiCall] AsyncFunction,
    get: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  reminders: {
    add: [Function: bound apiCall] AsyncFunction,
    complete: [Function: bound apiCall] AsyncFunction,
    delete: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction
  },
  rtm: {
    connect: [Function: bound apiCall] AsyncFunction,
    start: [Function: bound apiCall] AsyncFunction
  },
  search: {
    all: [Function: bound apiCall] AsyncFunction,
    files: [Function: bound apiCall] AsyncFunction,
    messages: [Function: bound apiCall] AsyncFunction
  },
  stars: {
    add: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    remove: [Function: bound apiCall] AsyncFunction
  },
  team: {
    accessLogs: [Function: bound apiCall] AsyncFunction,
    billableInfo: [Function: bound apiCall] AsyncFunction,
    billing: { info: [Function: bound apiCall] AsyncFunction },
    info: [Function: bound apiCall] AsyncFunction,
    integrationLogs: [Function: bound apiCall] AsyncFunction,
    preferences: { list: [Function: bound apiCall] AsyncFunction },
    profile: { get: [Function: bound apiCall] AsyncFunction }
  },
  usergroups: {
    create: [Function: bound apiCall] AsyncFunction,
    disable: [Function: bound apiCall] AsyncFunction,
    enable: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction,
    users: {
      list: [Function: bound apiCall] AsyncFunction,
      update: [Function: bound apiCall] AsyncFunction
    }
  },
  users: {
    conversations: [Function: bound apiCall] AsyncFunction,
    deletePhoto: [Function: bound apiCall] AsyncFunction,
    getPresence: [Function: bound apiCall] AsyncFunction,
    identity: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    lookupByEmail: [Function: bound apiCall] AsyncFunction,
    setPhoto: [Function: bound apiCall] AsyncFunction,
    setPresence: [Function: bound apiCall] AsyncFunction,
    profile: {
      get: [Function: bound apiCall] AsyncFunction,
      set: [Function: bound apiCall] AsyncFunction
    }
  },
  views: {
    open: [Function: bound apiCall] AsyncFunction,
    publish: [Function: bound apiCall] AsyncFunction,
    push: [Function: bound apiCall] AsyncFunction,
    update: [Function: bound apiCall] AsyncFunction
  },
  workflows: {
    stepCompleted: [Function: bound apiCall] AsyncFunction,
    stepFailed: [Function: bound apiCall] AsyncFunction,
    updateStep: [Function: bound apiCall] AsyncFunction
  },
  channels: {
    archive: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    join: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  groups: {
    archive: [Function: bound apiCall] AsyncFunction,
    create: [Function: bound apiCall] AsyncFunction,
    createChild: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    info: [Function: bound apiCall] AsyncFunction,
    invite: [Function: bound apiCall] AsyncFunction,
    kick: [Function: bound apiCall] AsyncFunction,
    leave: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    rename: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction,
    setPurpose: [Function: bound apiCall] AsyncFunction,
    setTopic: [Function: bound apiCall] AsyncFunction,
    unarchive: [Function: bound apiCall] AsyncFunction
  },
  im: {
    close: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction
  },
  mpim: {
    close: [Function: bound apiCall] AsyncFunction,
    history: [Function: bound apiCall] AsyncFunction,
    list: [Function: bound apiCall] AsyncFunction,
    mark: [Function: bound apiCall] AsyncFunction,
    open: [Function: bound apiCall] AsyncFunction,
    replies: [Function: bound apiCall] AsyncFunction
  },
  token: 'xoxb-979940347345-3659464274593-H8ERP5sJH0ViWxwDPJlc9fEf',
  slackApiUrl: 'https://slack.com/api/',
  retryConfig: { retries: 10, factor: 1.96821, randomize: true },
  requestQueue: PQueue {
    _events: Events <[Object: null prototype] {}> {},
    _eventsCount: 0,
    _intervalCount: 0,
    _intervalEnd: 0,
    _pendingCount: 0,
    _resolveEmpty: [Function: empty],
    _resolveIdle: [Function: empty],
    _carryoverConcurrencyCount: false,
    _isIntervalIgnored: true,
    _intervalCap: Infinity,
    _interval: 0,
    _queue: PriorityQueue { _queue: [] },
    _queueClass: [class PriorityQueue],
    _concurrency: 3,
    _intervalId: undefined,
    _timeout: undefined,
    _throwOnTimeout: false,
    _isPaused: false
  },
  tlsConfig: {},
  rejectRateLimitedCalls: false,
  teamId: undefined,
  logger: ConsoleLogger { level: 'info', name: 'web-api:WebClient:1' },
  axios: [Function: wrap] {
    request: [Function: wrap],
    getUri: [Function: wrap],
    delete: [Function: wrap],
    get: [Function: wrap],
    head: [Function: wrap],
    options: [Function: wrap],
    post: [Function: wrap],
    put: [Function: wrap],
    patch: [Function: wrap],
    defaults: {
      transitional: [Object],
      adapter: [Function: httpAdapter],
      transformRequest: [Array],
      transformResponse: [Array],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: [Function: validateStatus],
      headers: [Object],
      baseURL: 'https://slack.com/api/',
      maxRedirects: 0,
      proxy: false
    },
    interceptors: { request: [InterceptorManager], response: [InterceptorManager] },
    create: [Function: create]
  }
}
*/