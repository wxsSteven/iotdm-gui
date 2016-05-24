/**
 * Created by wenxshi on 12/22/15.
 */
angular.module("onem2m", []).service("Host", function () {
    this.defaultAddress = "localhost";
    this.defaultRestconfPort = 8181;
    this.defaultHttpPort = 8282;
    this.defaultAccount = "admin";
    this.defaultPassword = "admin";
    this.defaultMIME = "application/json";
}).service("Onem2m", function ($http, Host) {

    var resourceType = {
        accessControlPolicy: 1,
        AE: 2,
        container: 3,
        contentInstance: 4,
        CSEBase: 5,
        delivery: 6,
        eventConfig: 7,
        execInstance: 8,
        group: 9,
        locationPolicy: 10,
        m2mServiceSubscriptionProfile: 11,
        mgmtCmd: 12,
        mgmtObj: 13,
        node: 14,
        pollingChannel: 15,
        remoteCSE: 16,
        request: 17,
        schedule: 18,
        serviceSubscribedAppRule: 19,
        serviceSubscribedNode: 20,
        statsCollect: 21,
        statsConfig: 22,
        subscription: 23,
        accessControlPolicyAnnc: 10001,
        AEAnnc: 10002,
        containerAnnc: 10003,
        contentInstanceAnnc: 10004,
        groupAnnc: 10009,
        locationPolicyAnnc: 10010,
        mgmtObjAnnc: 10013,
        nodeAnnc: 10014,
        remoteCSEAnnc: 10016,
        scheduleAnnc: 10018
    };
    var cseTypeID = {
        IN_CSE: 1,
        MN_CSE: 2,
        ASN_CSE: 3
    };

    var locationSource = {
        Network_based: 1,
        Device_based: 2,
        Sharing_based: 3
    };

    var stdEventCats = {
        Immediate: 2,
        BestEffort: 3,
        Latest: 4
    };

    var operation = {
        create: 1,
        retrieve: 2,
        update: 3,
        delete: 4,
        notify: 5
    };

    var responseType = {
        nonBlockingRequestSynch: 1,
        nonBlockingRequestAsynch: 2,
        blockingRequest: 3
    };
    var resultContent = {
        nothing: 0,
        attributes: 1,
        "hierarchical address": 2,
        "hierarchical address and attributes": 3,
        "attributes and child resources": 4,
        "attributes and child resource references": 5,
        "child resource references": 6,
        "original resource": 7
    };

    var discResType = {
        structured: 1,
        unstructured: 2
    };

    var responseStatusCode = {
        ACCEPTED: 1000,
        OK: 2000,
        CREATED: 2001,
        DELETED: 2002,
        UPDATED: 2004,
        BAD_REQUEST: 4000,
        NOT_FOUND: 4004,
        OPERATION_NOT_ALLOWED: 4005,
        REQUEST_TIMEOUT: 4008,
        SUBSCRIPTION_CREATOR_HAS_NO_PRIVILEGE: 4101,
        CONTENTS_UNACCEPTABLE: 4102,
        ACCESS_DENIED: 4103,
        GROUP_REQUEST_IDENTIFIER_EXISTS: 4104,
        CONFLICT: 4105,
        INTERNAL_SERVER_ERROR: 5000,
        NOT_IMPLEMENTED: 5001,
        TARGET_NOT_REACHABLE: 5103,
        NO_PRIVILEGE: 5105,
        ALREADY_EXISTS: 5106,
        TARGET_NOT_SUBSCRIBABLE: 5203,
        SUBSCRIPTION_VERIFICATION_INITIATION_FAILED: 5204,
        SUBSCRIPTION_HOST_HAS_NO_PRIVILEGE: 5205,
        NON_BLOCKING_REQUEST_NOT_SUPPORTED: 5206,
        NOT_ACCEPTABLE: 5207,
        EXTERNAL_OBJECT_NOT_REACHABLE: 6003,
        EXTERNAL_OBJECT_NOT_FOUND: 6005,
        MAX_NUMBER_OF_MEMBER_EXCEEDED: 6010,
        MEMBER_TYPE_INCONSISTENT: 6011,
        MGMT_SESSION_CANNOT_BE_ESTABLISHED: 6020,
        MGMT_SESSION_ESTABLISHMENT_TIMEOUT: 6021,
        INVALID_CMDTYPE: 6022,
        INVALID_ARGUMENTS: 6023,
        INSUFFICIENT_ARGUMENTS: 6024,
        MGMT_CONVERSION_ERROR: 6025,
        MGMT_CANCELLATION_FAILED: 6026,
        ALREADY_COMPLETE: 6028,
        MGMT_COMMAND_NOT_CANCELLABLE: 6029
    };

    var requestStatus = {
        COMPLETED: 1,
        FAILED: 2,
        PENDING: 3,
        FORWARDED: 4
    };

    var memberType = {
        accessControlPolicy: 1,
        AE: 2,
        container: 3,
        contentInstance: 4,
        CSEBase: 5,
        delivery: 6,
        eventConfig: 7,
        execInstance: 8,
        group: 9,
        locationPolicy: 10,
        m2mServiceSubscription: 11,
        mgmtCmd: 12,
        mgmtObj: 13,
        node: 14,
        pollingChannel: 15,
        remoteCSE: 16,
        request: 17,
        schedule: 18,
        serviceSubscribedAppRule: 19,
        serviceSubscribedNode: 20,
        statsCollect: 21,
        statsConfig: 22,
        subscription: 23,
        mixed: 24
    };

    var consistencyStrategy = {
        ABANDON_MEMBER: 1,
        ABANDON_GROUP: 2,
        SET_MIXED: 3
    };

    var cmdType = {
        RESET: 1,
        REBOOT: 2,
        UPLOAD: 3,
        DOWNLOAD: 4,
        SOFTWAREINSTALL: 5,
        SOFTWAREUNINSTALL: 6,
        SOFTWAREUPDATE: 7
    };

    var execModetType = {
        IMMEDIATEONCE: 1,
        IMMEDIATEREPEAT: 2,
        RANDOMONCE: 3,
        RANDOMREPEAT: 4
    };
    var execStatusType = {
        INITIATED: 1,
        PENDING: 2,
        FINISHED: 3,
        CANCELLING: 4,
        CANCELLED: 5,
        STATUS_NON_CANCELLABLE: 6
    };

    var execResultType = {
        STATUS_REQUEST_UNSUPPORTED: 1,
        STATUS_REQUEST_DENIED: 2,
        STATUS_CANCELLATION_DENIED: 3,
        STATUS_INTERNAL_ERROR: 4,
        STATUS_INVALID_ARGUMENTS: 5,
        STATUS_RESOURCES_EXCEEDED: 6,
        STATUS_FILE_TRANSFER_FAILED: 7,
        STATUS_FILE_TRANSFER_SERVER_AUTHENTICATION_FAILURE: 8,
        STATUS_UNSUPPORTED_PROTOCOL: 9,
        STATUS_UPLOAD_FAILED: 10,
        STATUS_FILE_TRANSFER_FAILED_MULTICAST_GROUP_UNABLE_JOIN: 11,
        STATUS_FILE_TRANSFER_FAILED_SERVER_CONTACT_FAILED: 12,
        STATUS_FILE_TRANSFER_FAILED_FILE_ACCESS_FAILED: 13,
        STATUS_FILE_TRANSFER_FAILED_DOWNLOAD_INCOMPLETE: 14,
        STATUS_FILE_TRANSFER_FAILED_FILE_CORRUPTED: 15,
        STATUS_FILE_TRANSFER_FILE_AUTHENTICATION_FAILURE: 16,
        STATUS_FILE_TRANSFER_WINDOW_EXCEEDED: 19,
        STATUS_INVALID_UUID_FORMAT: 20,
        STATUS_UNKNOWN_EXECUTION_ENVIRONMENT: 21,
        STATUS_DISABLED_EXECUTION_ENVIRONMENT: 22,
        STATUS_EXECUTION_ENVIRONMENT_MISMATCH: 23,
        STATUS_DUPLICATE_DEPLOYMENT_UNIT: 24,
        STATUS_SYSTEM_RESOURCES_EXCEEDED: 25,
        STATUS_UNKNOWN_DEPLOYMENT_UNIT: 26,
        STATUS_INVALID_DEPLOYMENT_UNIT_STATE: 27,
        STATUS_INVALID_DEPLOYMENT_UNIT_UPDATE_DOWNGRADE_DISALLOWED: 28,
        STATUS_INVALID_DEPLOYMENT_UNIT_UPDATE_UPGRADE_DISALLOWED: 29,
        STATUS_INVALID_DEPLOYMENT_UNIT_UPDATE_VERSION_EXISTS: 30
    };

    var pendingNotification = {
        sendLatest: 1,
        sendAllPending: 2
    };

    var notificationContentType = {
        "All Attributes": 1,
        "Modefied Attributes": 2,
        "ResourceID": 3
    };

    var notificationEventType = {
        Update_of_Resource: 1,
        Delete_of_Resource: 2,
        Create_of_Direct_Child_Resource: 3,
        Delete_of_Direct_Child_Resource: 4
    };

    var status = {
        Successful: 1,
        Failure: 2,
        In_Process: 3
    };

    var batteryStatus = {
        NORMAL: 1,
        CHARGING: 2,
        CHARGING_COMPLETE: 3,
        DAMAGED: 4,
        LOW_BATTERY: 5,
        NOT_INSTALLED: 6,
        UNKNOWN: 7
    };

    var mgmtDefinition = {
        firmware: 1001,
        software: 1002,
        memory: 1003,
        areaNwkInfo: 1004,
        areaNwkDeviceInfo: 1005,
        battery: 1006,
        deviceInfo: 1007,
        deviceCapability: 1008,
        reboot: 1009,
        eventLog: 1010,
        cmdhPolicy: 1011,
        activeCmdhPolicy: 1012,
        cmdhDefaults: 1013,
        cmdhDefEcValue: 1014,
        cmdhEcDefParamValues: 1015,
        cmdhLimits: 1016,
        cmdhNetworkAccessRules: 1017,
        cmdhNwAccessRule: 1018,
        cmdhBuffer: 1019,
        unspecified: 0
    };

    var logTypeId = {
        System: 1,
        Security: 2,
        Event: 3,
        Trace: 4,
        Panic: 5
    };

    var logStatus = {
        Started: 1,
        Stopped: 2,
        Unknown: 3,
        NotPresent: 4,
        Error: 5
    };

    var eventType = {
        DATAOPERATION: 1,
        STORAGEBASED: 2,
        TIMERBASED: 3
    };

    var statsRuleStatusType = {
        ACTIVE: 1,
        INACTIVE: 2
    };

    var statModelType = {
        EVENTBASED: 1
    };

    var encodingType = {
        Plain: 0,
        "base64 encoding applied on string data": 1,
        "base64 encoding applied on binary data": 2,
    };

    var accessControlOperations = {
        CREATE: 1,
        RETRIEVE: 2,
        UPDATE: 4,
        DELETE: 8,
        NOTIFY: 16,
        DISCOVERY: 32
    };

    var SRole_ID = {
        "Software Management": "01-001",
        "Device Configuration": "02-001",
        "Device Diagnostics and Management": "02-002",
        "Device Firmware Management": "02-003",
        "Device Topology": "02-004",
        "Location": "03-001",
        "Basic Data": "04-001",
        "Onboarding": "05-001",
        "Security Administration": "06-001",
        "Groups Management": "07-001",
        "Event Collection": "08-001",
    };
    var filterUsage = {
        "Discovery Criteria": 1,
        "Conditional Retrieval": 2

    };
    // Enum end

    var enums = {
        resourceType: resourceType,
        locationSource: locationSource,
        operation: operation,
        responseType: responseType,
        resultContent: resultContent,
        responseStatusCode: responseStatusCode,
        requestStatus: requestStatus,
        memberType: memberType,
        consistencyStrategy: consistencyStrategy,
        cmdType: cmdType,
        pendingNotification: pendingNotification,
        notificationContentType: notificationContentType,
        notificationEventType: notificationEventType,
        status: status,
        batteryStatus: batteryStatus,
        mgmtDefinition: mgmtDefinition,
        logTypeId: logTypeId,
        logStatus: logStatus,
        eventType: eventType,
        accessControlOperations: accessControlOperations,
        supportedResourceType: resourceType,
        discResType: discResType,
        filterUsage: filterUsage,
        eventCategory: stdEventCats
    };


    //resource start
    var accessControlPolicy = {
        create: {
            resourceName: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            privileges: true,
            selfPrivileges: true
        },
        update: {
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            privileges: false,
            selfPrivileges: false
        }
    };

    var AE = {
        create: {
            resourceName: false,
            accessControlPolicyIDs: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            appName: false,
            "App-ID": true,
            pointOfAccess: false,
            ontologyRef: false,
            requestReachability: true,
            contentSerialization: false
        },
        update: {
            accessControlPolicyIDs: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            appName: false,
            pointOfAccess: false,
            ontologyRef: false,
            requestReachability: false,
            contentSerialization: false
        }
    };

    var container = {
        create: {
            resourceName: false,
            accessControlPolicyIDs: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            creator: false,
            maxNrOfInstances: false,
            maxByteSize: false,
            maxInstanceAge: false,
            locationID: false,
            ontologyRef: false
        },
        update: {
            accessControlPolicyIDs: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            maxNrOfInstances: false,
            maxByteSize: false,
            maxInstanceAge: false,
            locationID: false,
            ontologyRef: false
        }
    };

    var contentInstance = {
        create: {
            resourceName: false,
            expirationTime: false,
            labels: false,
            announceTo: false,
            announcedAttribute: false,
            creator: false,
            contentInfo: false,
            contentSize: false,
            ontologyRef: false,
            content: true
        }
    };

    var CSEBase = {};
    //resource end

    //primitive start
    var requestPrimitive = {
        create: {
            operation: true,
            to: true,
            from: true,
            requestIdentifier: true,
            resourceType: true,
            primitiveContent: true,
            role: false,
            originatingTimestamp: false,
            requestExpirationTimestamp: false,
            resultExpirationTimestamp: false,
            operationExecutionTime: false,
            responseType: false,
            resultPersistence: false,
            resultContent: false,
            eventCategory: false,
            deliveryAggregation: false,
            groupRequestIdentifier: false
        },
        retrieve: {
            operation: true,
            to: true,
            from: true,
            requestIdentifier: true,
            primitiveContent: false,
            role: false,
            originatingTimestamp: false,
            requestExpirationTimestamp: false,
            resultExpirationTimestamp: false,
            operationExecutionTime: false,
            responseType: false,
            resultPersistence: false,
            resultContent: false,
            eventCategory: false,
            deliveryAggregation: false,
            groupRequestIdentifier: false,
            filterCriteria: false,
            discoveryResultType: false
        },
        update: {
            operation: true,
            to: true,
            from: true,
            requestIdentifier: true,
            primitiveContent: true,
            role: false,
            originatingTimestamp: false,
            requestExpirationTimestamp: false,
            resultExpirationTimestamp: false,
            operationExecutionTime: false,
            responseType: false,
            resultPersistence: false,
            resultContent: false,
            eventCategory: false,
            deliveryAggregation: false,
            groupRequestIdentifier: false,
            filterCriteria: false
        },
        delete: {
            operation: true,
            to: true,
            from: true,
            requestIdentifier: true,
            role: false,
            originatingTimestamp: false,
            requestExpirationTimestamp: false,
            resultExpirationTimestamp: false,
            operationExecutionTime: false,
            responseType: false,
            resultPersistence: false,
            resultContent: false,
            eventCategory: false,
            deliveryAggregation: false,
            groupRequestIdentifier: false,
            filterCriteria: false
        }
    };
    //primitive end

    var resource = {
        accessControlPolicy: accessControlPolicy,
        AE: AE,
        CSEBase: CSEBase,
        container: container,
        contentInstance: contentInstance
    };

    var primitive = {
        requestPrimitive: requestPrimitive
    };

    //constant
    var longToShort = {
        "operation": "operation",
        "to": "to",
        "from": "fr",
        "requestIdentifier": "rqi",
        "resourceType": "ty",
        "primitiveContent": "pc",
        "role": "rol",
        "originatingTimestamp": "ot",
        "requestExpirationTimestamp": "rqet",
        "resultExpirationTimestamp": "rset",
        "operationExecutionTime": "oet",
        "responseType": "rt",
        "resultPersistence": "rp",
        "resultContent": "rcn",
        "eventCategory": "ec",
        "deliveryAggregation": "da",
        "groupRequestIdentifier": "gid",
        "filterCriteria": "fc",
        "discoveryResultType": "drt",
        "responseStatusCode": "rsc",
        "requestPrimitive": "rqp",
        "responsePrimitive": "rsp",
        "accessControlPolicyIDs": "acpi",
        "announcedAttribute": "aa",
        "announceTo": "at",
        "creationTime": "ct",
        "expirationTime": "et",
        "labels": "lbl",
        "link": "lnk",
        "lastModifiedTime": "lt",
        "parentID": "pi",
        "resourceID": "ri",
        "stateTag": "st",
        "resourceName": "rn",
        "privileges": "pv",
        "selfPrivileges": "pvs",
        "App-ID": "api",
        "AE-ID": "aei",
        "appName": "apn",
        "pointOfAccess": "poa",
        "ontologyRef": "or",
        "nodeLink": "nl",
        "creator": "cr",
        "maxNrOfInstances": "mni",
        "maxByteSize": "mbs",
        "maxInstanceAge": "mia",
        "currentNrOfInstances": "cni",
        "currentByteSize": "cbs",
        "locationID": "li",
        "contentInfo": "cnf",
        "contentSize": "cs",
        "content": "con",
        "cseType": "cst",
        "CSE-ID": "csi",
        "supportedResourceType": "srt",
        "notificationCongestionPolicy": "ncp",
        "source": "sr",
        "target": "tg",
        "lifespan": "ls",
        "eventCat": "eca",
        "deliveryMetaData": "dmd",
        "aggregatedRequest": "arq",
        "eventID": "evi",
        "eventType": "evt",
        "eventStart": "evs",
        "eventEnd": "eve",
        "operationType": "opt",
        "dataSize": "ds",
        "execStatus": "exs",
        "execResult": "exr",
        "execDisable": "exd",
        "execTarget": "ext",
        "execMode": "exm",
        "execFrequency": "exf",
        "execDelay": "exy",
        "execNumber": "exn",
        "execReqArgs": "exra",
        "execEnable": "exe",
        "memberType": "mt",
        "currentNrOfMembers": "cnm",
        "maxNrOfMembers": "mnm",
        "memberIDs": "mid",
        "membersAccessControlPolicyIDs": "macp",
        "memberTypeValidated": "mtv",
        "consistencyStrategy": "csy",
        "groupName": "gn",
        "locationSource": "los",
        "locationUpdatePeriod": "lou",
        "locationTargetID": "lot",
        "locationServer": "lor",
        "locationContainerID": "loi",
        "locationContainerName": "lon",
        "locationStatus": "lost",
        "serviceRoles": "svr",
        "description": "dc",
        "cmdType": "cmt",
        "mgmtDefinition": "mgd",
        "objectIDs": "obis",
        "objectPaths": "obps",
        "nodeID": "ni",
        "hostedCSELink": "hcl",
        "CSEBase": "cb",
        "M2M-Ext-ID": "mei",
        "Trigger-Recipient-ID": "tri",
        "requestReachability": "rr",
        "originator": "org",
        "metaInformation": "mi",
        "requestStatus": "rs",
        "operationResult": "ors",
        "requestID": "rid",
        "scheduleElement": "se",
        "deviceIdentifier": "di",
        "ruleLinks": "rlk",
        "statsCollectID": "sci",
        "collectingEntityID": "cei",
        "collectedEntityID": "cdi",
        "devStatus": "ss",
        "statsRuleStatus": "srs",
        "statModel": "sm",
        "collectPeriod": "cp",
        "eventNotificationCriteria": "enc",
        "expirationCounter": "exc",
        "notificationURI": "nu",
        "groupID": "gpi",
        "notificationForwardingURI": "nfu",
        "batchNotify": "bn",
        "rateLimit": "rl",
        "preSubscriptionNotify": "psn",
        "pendingNotification": "pn",
        "notificationStoragePriority": "nsp",
        "latestNotify": "ln",
        "notificationContentType": "nct",
        "notificationEventCat": "nec",
        "subscriberURI": "su",
        "version": "vr",
        "URL": "url",
        "URI": "uri",
        "update": "ud",
        "updateStatus": "uds",
        "install": "in",
        "uninstall": "un",
        "installStatus": "ins",
        "activate": "act",
        "deactivate": "dea",
        "activeStatus": "acts",
        "memAvailable": "mma",
        "memTotal": "mmt",
        "areaNwkType": "ant",
        "listOfDevices": "ldv",
        "devID": "dvd",
        "devType": "dvt",
        "areaNwkId": "awi",
        "sleepInterval": "sli",
        "sleepDuration": "sld",
        "listOfNeighbors": "lnh",
        "batteryLevel": "btl",
        "batteryStatus": "bts",
        "deviceLabel": "dlb",
        "manufacturer": "man",
        "model": "mod",
        "deviceType": "dty",
        "fwVersion": "fwv",
        "swVersion": "swv",
        "hwVersion": "hwv",
        "capabilityName": "can",
        "attached": "att",
        "capabilityActionStatus": "cas",
        "enable": "ena",
        "disable": "dis",
        "currentState": "cus",
        "reboot": "rbo",
        "factoryReset": "far",
        "logTypeId": "lgt",
        "logData": "lgd",
        "logActionStatus": "lgs",
        "logStatus": "lgst",
        "logStart": "lga",
        "logStop": "lgo",
        "firmwareName": "fwn",
        "softwareName": "swn",
        "cmdhPolicyName": "cpn",
        "mgmtLink": "cmlk",
        "activeCmdhPolicyLink": "acmlk",
        "order": "od",
        "defEcValue": "dev",
        "requestOrigin": "ror",
        "requestContext": "rct",
        "requestContextNotification": "rctn",
        "requestCharacteristics": "rch",
        "applicableEventCategories": "aecs",
        "applicableEventCategory": "aec",
        "defaultRequestExpTime": "dqet",
        "defaultResultExpTime": "dset",
        "defaultOpExecTime": "doet",
        "defaultRespPersistence": "drp",
        "defaultDelAggregation": "dda",
        "limitsEventCategory": "lec",
        "limitsRequestExpTime": "lqet",
        "limitsResultExpTime": "lset",
        "limitsOpExecTime": "loet",
        "limitsRespPersistence": "lrp",
        "limitsDelAggregation": "lda",
        "targetNetwork": "ttn",
        "minReqVolume": "mrv",
        "backOffParameters": "bop",
        "otherConditions": "ohc",
        "maxBufferSize": "mbfs",
        "storagePriority": "sgp",
        "applicableCredIDs": "apci",
        "allowedApp-IDs": "aai",
        "allowedAEs": "aae",
        "accessControlPolicy": "acp",
        "accessControlPolicyAnnc": "acpA",
        "AE": "ae",
        "AEAnnc": "aeA",
        "container": "cnt",
        "containerAnnc": "cntA",
        "latest": "la",
        "oldest": "ol",
        "contentInstance": "cin",
        "contentInstanceAnnc": "cinA",
        "delivery": "dlv",
        "eventConfig": "evcg",
        "execInstance": "exin",
        "fanOutPoint": "fopt",
        "group": "grp",
        "groupAnnc": "grpA",
        "locationPolicy": "lcp",
        "locationPolicyAnnc": "lcpA",
        "m2mServiceSubscriptionProfile": "mssp",
        "mgmtCmd": "mgc",
        "mgmtObj": "mgo",
        "mgmtObjAnnc": "mgoA",
        "node": "nod",
        "nodeAnnc": "nodA",
        "pollingChannel": "pch",
        "pollingChannelURI": "pcu",
        "remoteCSE": "csr",
        "remoteCSEAnnc": "csrA",
        "request": "req",
        "schedule": "sch",
        "scheduleAnnc": "schA",
        "serviceSubscribedAppRule": "asar",
        "serviceSubscribedNode": "svsn",
        "statsCollect": "stcl",
        "statsConfig": "stcg",
        "subscription": "sub",
        "firmware": "fwr",
        "firmwareAnnc": "fwrA",
        "software": "swr",
        "softwareAnnc": "swrA",
        "memory": "mem",
        "memoryAnnc": "memA",
        "areaNwkInfo": "ani",
        "areaNwkInfoAnnc": "aniA",
        "areaNwkDeviceInfo": "andi",
        "areaNwkDeviceInfoAnnc": "andiA",
        "battery": "bat",
        "batteryAnnc": "batA",
        "deviceInfo": "dvi",
        "deviceInfoAnnc": "dviA",
        "deviceCapability": "dvc",
        "deviceCapabilityAnnc": "dvcA",
        "rebootAnnc": "rboA",
        "eventLog": "evl",
        "eventLogAnnc": "evlA",
        "cmdhPolicy": "cmp",
        "activeCmdhPolicy": "acmp",
        "cmdhDefaults": "cmdf",
        "cmdhDefEcValue": "cmdv",
        "cmdhEcDefParamValues": "cmpv",
        "cmdhLimits": "cml",
        "cmdhNetworkAccessRules": "cmnr",
        "cmdhNwAccessRule": "cmwr",
        "cmdhBuffer": "cmbf",
        "createdBefore": "crb",
        "createdAfter": "cra",
        "modifiedSince": "ms",
        "unmodifiedSince": "us",
        "stateTagSmaller": "sts",
        "stateTagBigger": "stb",
        "expireBefore": "exb",
        "expireAfter": "exa",
        "sizeAbove": "sza",
        "sizeBelow": "szb",
        "contentType": "cty",
        "limit": "lim",
        "attribute": "atr",
        "resourceStatus": "rss",
        "notificationEventType": "net",
        "operationMonitor": "om",
        "representation": "rep",
        "filterUsage": "fu",
        "eventCatType": "ect",
        "eventCatNo": "ecn",
        "number": "num",
        "duration": "dur",
        "notification": "sgn",
        "notificationEvent": "nev",
        "verificationRequest": "vrq",
        "subscriptionDeletion": "sud",
        "subscriptionReference": "sur",
        "accessId": "aci",
        "MSISDN": "msd",
        "action": "acn",
        "status": "sus",
        "childResource": "ch",
        "accessControlRule": "acr",
        "accessControlOriginators": "acor",
        "accessControlOperations": "acop",
        "accessControlContexts": "acco",
        "accessControlWindow": "actw",
        "accessControlIpAddresses": "acip",
        "ipv4Addresses": "ipv4",
        "ipv6Addresses": "ipv6",
        "accessControlLocationRegion": "aclr",
        "countryCode": "accc",
        "circRegion": "accr",
        "value": "val",
        "type": "typ",
        "maxNrOfNotify": "mnn",
        "timeWindow": "tww",
        "scheduleEntry": "sce",
        "aggregatedNotification": "agn",
        "attributeList": "atrl",
        "aggregatedResponse": "agr",
        "resource": "rce",
        "URIList": "uril",
        "anyArg": "any",
        "fileType": "ftyp",
        "username": "unm",
        "password": "pwd",
        "filesize": "fsi",
        "targetFile": "tgf",
        "delaySeconds": "dss",
        "successURL": "surl",
        "startTime": "stt",
        "completeTime": "cpt",
        "UUID": "uuid",
        "executionEnvRef": "eer",
        "reset": "rst",
        "upload": "uld",
        "download": "dld",
        "softwareInstall": "swin",
        "softwareUpdate": "swup",
        "softwareUninstall": "swun",
        "tracingOption": "tcop",
        "tracingInfo": "tcin",
        "responseTypeValue": "rtv",
        contentSerialization: "csz"
    };

    var shortToLong = {};

    for (var key in longToShort) {
        shortToLong[longToShort[key]] = key;
    }


    var _retrieve = function (primitive) {
        var request = primitive.requestPrimitive;
        var host = primitive.host;
        var httpRequest = parseRequest(request, host);
        return $http.get(httpRequest.url, {headers: httpRequest.headers}).then(function (httpResponse) {
            primitive.responsePrimitive = parseHttpResponse(httpResponse);
            return primitive;
        });
    };

    var _create = function (primitive) {
        var request = primitive.requestPrimitive;
        var host = primitive.host;
        var httpRequest = parseRequest(request, host);
        return $http.post(httpRequest.url, httpRequest.payload, {headers: httpRequest.headers}).then(function (httpResponse) {
            primitive.responsePrimitive = parseHttpResponse(httpResponse);
            return primitive;
        });
    };

    var _update = function (primitive) {
        var request = primitive.requestPrimitive;
        var host = primitive.host;
        var httpRequest = parseRequest(request, host);
        return $http.put(httpRequest.url, httpRequest.payload, {headers: httpRequest.headers}).then(function (httpResponse) {
            primitive.responsePrimitive = parseHttpResponse(httpResponse);
            return primitive;
        });
    };

    var _delete = function (primitive) {
        var request = primitive.requestPrimitive;
        var host = primitive.host;
        var httpRequest = parseRequest(request, host);
        return $http.delete(httpRequest.url, {headers: httpRequest.headers}).then(function (httpResponse) {
            primitive.responsePrimitive = parseHttpResponse(httpResponse);
            return primitive;
        });
    };

    var urlFormat = "http://{0}:{1}/{2}";
    //todo
    function parseRequest(request, host) {
        host = host ? host : {};
        host.address = host.address ? host.address : Host.defaultAddress;
        host.httpPort = host.httpPort ? host.httpPort : Host.defaultHttpPort;

        var url = urlFormat.format(host.address, host.httpPort, request.to);


        var query = {};
        query.rt = request.responseType && request.responseType.responseTypeValue;
        query.rp = request.resultPersistence;
        query.rcn = request.resultContent;
        query.da = request.deliveryAggregation;
        if (request.filterCriteria) {
            var fc = request.filterCriteria;
            query.crb = fc.createdBefore;
            query.cra = fc.createdAfter;

            query.ms = fc.modifiedSince;
            query.us = fc.unmodifiedSince;

            query.sts = fc.stateTagSmaller;
            query.stb = fc.stateTagBigger;

            query.exb = fc.expireBefore;
            query.exa = fc.expireAfter;

            query.lbl = fc.labels && fc.labels.join("+");
            query.ty = fc.resourceType;

            query.sza = fc.sizeAbove;
            query.szb = fc.sizeBelow;

            query.cty = fc.contentType && fc.contentType.join("+");
            query.lim = fc.limit;

            if (fc.attribute) {
                fc.attribute.forEach(function (d) {
                        query[d.nm] = d.val;
                    }
                )
            }
            query.fu = fc.filterUsage;
        }
        query.drt = request.discoveryResultType;

        var queryArray = [];
        for (var key in query) {
            if (query[key]) {
                queryArray.push(key + "=" + query[key]);
            }
        }

        url = queryArray.length > 0 ? url + "?" + queryArray.join("&") : url;


        var headers = {};
        headers["Accept"] = Host.defaultMIME;
        if (request.operation)
            headers["Content-Type"] = request.operation == 1 ? Host.defaultMIME + ";ty=" + request.resourceType : Host.defaultMIME;

        if (request.from)
            headers["X-M2M-Origin"] = request.from;

        if (request.requestIdentifier)
            headers["X-M2M-RI"] = request.requestIdentifier;

        if (request.groupRequestIdentifier)
            headers["X-M2M-GID"] = request.groupRequestIdentifier;

        if (request.responseType && request.responseType.notificationURI && request.responseType.notificationURI.length > 0)
            headers["X-M2M-RTU"] = request.responseType.notificationURI.join("&");

        if (request.originatingTimestamp)
            headers["X-M2M-OT"] = request.originatingTimestamp;

        if (request.resultExpirationTimestamp)
            headers["X-M2M-RST"] = request.resultExpirationTimestamp;

        if (request.requestExpirationTimestamp)
            headers["X-M2M-RET"] = request.requestExpirationTimestamp;

        if (request.operationExecutionTime)
            headers["X-M2M-OET"] = request.operationExecutionTime;

        if (request.eventCategory)
            headers["X-M2M-EC"] = request.eventCategory;

        var payload = {};
        for (var key in request.primitiveContent) {
            payload[toShort(key)] = toShort(request.primitiveContent[key]);
        }


        var httpRequest = {url: url, payload: payload, headers: headers};
        return httpRequest;
    }

    function parseHttpResponse(httpResponse) {
        var response = {};
        var headers = httpResponse.headers();

        response.responseStatusCode = headers["X-M2M-RSC".toLowerCase()];
        response.requestIdentifier = headers["X-M2M-RI".toLowerCase()];
        response.primitiveContent = toLong(httpResponse.data);
        response.from = httpResponse["X-M2M-Origin".toLowerCase()];
        response.originatingTimestamp = headers["X-M2M-OT".toLowerCase()];
        response.originatingTimestamp = headers["X-M2M-RST".toLowerCase()];
        response.eventCategory = headers["X-M2M-EC".toLowerCase()];
        return response;
    }

    this.CRUD = function (primitive) {
        var request = primitive.requestPrimitive;
        switch (request.operation) {
            case operation.Create:
                return _create(primitive);
            case operation.Retrieve:
                return _retrieve(primitive);
            case operation.Update:
                return _update(primitive);
            case operation.Delete:
                return _delete(primitive);
        }
    };

    this.resourceTypeName = function (value) {
        for (var key in resourceType) {
            if (resourceType[key] == value)
                return key;
        }
    }
}).service('Onem2mDataWiki',function(){
    this.children=function(node){
        return node.value.ch;
    };

    this.id=function(node){
        return node.value.ri;
    };
}).service('Onem2mDataStore',function(Onem2mDataWiki){
    var cache={};
    var root={
        key: "m2m:cb",
        value: {
            "ct": "20160524T211038",
            "srt": [
                5,
                2,
                3,
                4,
                23,
                9,
                14,
                1
            ],
            "ch": [
                {
                    key: "m2m:acp",
                    value: {
                        "ct": "20160524T211038",
                        "ty": 1,
                        "pv": {
                            "acr": [
                                {
                                    "acor": [
                                        "*"
                                    ],
                                    "acop": 63
                                }
                            ]
                        },
                        "ri": "3",
                        "lt": "20160524T211038",
                        "pi": "/InCSE1/2",
                        "pvs": {
                            "acr": [
                                {
                                    "acor": [
                                        "admin"
                                    ],
                                    "acop": 63
                                }
                            ]
                        },
                        "rn": "_defaultACP",
                        "et": "29991231T111111"
                    }
                },
                {
                    key: "m2m:ae",
                    value: {
                        "rr": true,
                        "ct": "20160525T151059",
                        "or": "iphone",
                        "aei": "AE",
                        "ty": 2,
                        "ri": "4",
                        "lt": "20160525T151059",
                        "pi": "/InCSE1/2",
                        "api": "1234",
                        "rn": "AE",
                        "et": "29991231T111111"
                    }
                },
                {
                    key: "m2m:cnt",
                    value: {
                        "st": 0,
                        "or": "http://hey/you",
                        "ty": 3,
                        "lt": "20160525T151225",
                        "cr": "//localhost:10000",
                        "et": "29991231T111111",
                        "ct": "20160525T151225",
                        "cbs": 0,
                        "lbl": [
                            "key1"
                        ],
                        "ri": "5",
                        "pi": "/InCSE1/2",
                        "rn": "container1",
                        "mbs": 30,
                        "cni": 0
                    }
                }
            ],
            "cst": "IN-CSE",
            "ty": 5,
            "ri": "2",
            "csi": "InCSE1",
            "lt": "20160524T211038",
            "rn": "InCSE1"
        }
    };

    this.preprocessOnem2mRawData=function(data){
        function helper(data){
            var key=Object.keys(data)[0];
            var value=data[key];
            data.key=key;
            data.value=value;
            delete data(key);
            Onem2mDataWiki.children(data)
        }
    };

    this.updateData=function(id,data){

    };

    this.deleteData=function(id){

    };

    this.addData=function(parentId,data){

    };

    this.findDataById=function(id){

    };

    this.root=root;
});

