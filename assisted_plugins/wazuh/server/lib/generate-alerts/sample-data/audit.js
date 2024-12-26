"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileName = exports.dataAudit = void 0;
var _common = require("./common");
/*
 * Wazuh app - Audit sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Audit

const fileName = exports.fileName = ["/etc/samplefile", "/etc/sample/file", "/var/sample"];
const ruleId = ['80790', '80784', '80781', '80791'];
const auditType = ["SYSCALL", "EXECVE", "CWD", "NORMAL", "PATH", "PROCTITLE"];
const dataAudit = exports.dataAudit = [{
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/sudo',
      command: 'sudo',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 12,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/sudo",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/sshd',
      command: 'ssh',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 3,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/ssh",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/crond',
      command: 'cron',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 1,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/crond",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/ls',
      command: 'ls',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 6,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/ls",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/sbin/consoletype'
      },
      exe: '/usr/sbin/consoletype',
      command: 'consoletype',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 16,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/consoletype",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/bin/bash'
      },
      exe: '/usr/sbin/bash',
      command: 'bash',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 1,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/bash",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/id'
      },
      exe: '/usr/sbin/id',
      command: 'id',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 11,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/id",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/grep'
      },
      exe: '/usr/sbin/grep',
      command: 'grep',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 13,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/grep",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/hostname'
      },
      exe: '/usr/sbin/hostname',
      command: 'hostname',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 13,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/hostname",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/sh'
      },
      exe: '/usr/sbin/sh',
      command: 'sh',
      success: 'yes',
      cwd: "/home/sh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 17,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/sh",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}
//   {
//     data: {
//       audit: {
//         res: "1",
//         id: "1002556",
//         type: "CONFIG_CHANGE",
//         list: "4",
//         key: "wazuh_fim"
//       },
//     },
//     rule: {
// id: randomArrayItem(ruleId),
//       firedtimes: 10,
//       mail: false,
//       level: 3,
//       description: "Auditd: Configuration changed",
//       groups: [
//         "audit",
//         "audit_configuration"
//       ],
//       gpg13: [
//         "10.1"
//       ],
//       gdpr: [
//         "IV_30.1.g"
//       ]
//     },
//   },
];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsImZpbGVOYW1lIiwiZXhwb3J0cyIsInJ1bGVJZCIsImF1ZGl0VHlwZSIsImRhdGFBdWRpdCIsImRhdGEiLCJhdWRpdCIsImZpbGUiLCJuYW1lIiwiZXhlIiwiY29tbWFuZCIsInN1Y2Nlc3MiLCJjd2QiLCJ0eXBlIiwicmFuZG9tQXJyYXlJdGVtIiwicnVsZSIsImlkIiwiZmlyZWR0aW1lcyIsIm1haWwiLCJsZXZlbCIsImRlc2NyaXB0aW9uIiwiZ3JvdXBzIiwiZ2RwciJdLCJzb3VyY2VzIjpbImF1ZGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBBdWRpdCBzYW1wbGUgZGF0YVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuLy8gQXVkaXRcblxuaW1wb3J0IHsgcmFuZG9tQXJyYXlJdGVtIH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgZmlsZU5hbWUgPSBbXCIvZXRjL3NhbXBsZWZpbGVcIiwgXCIvZXRjL3NhbXBsZS9maWxlXCIsIFwiL3Zhci9zYW1wbGVcIl07XG5jb25zdCBydWxlSWQgPSBbJzgwNzkwJywgJzgwNzg0JywgJzgwNzgxJywgJzgwNzkxJ107XG5jb25zdCBhdWRpdFR5cGUgPSBbXCJTWVNDQUxMXCIsIFwiRVhFQ1ZFXCIsIFwiQ1dEXCIsIFwiTk9STUFMXCIsIFwiUEFUSFwiLCBcIlBST0NUSVRMRVwiXTtcblxuZXhwb3J0IGNvbnN0IGRhdGFBdWRpdCA9IFt7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9zdWRvJyxcbiAgICAgICAgY29tbWFuZDogJ3N1ZG8nLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDEyLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkF1ZGl0OiBDb21tYW5kOiAvdXNyL3NiaW4vc3Vkb1wiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9zc2hkJyxcbiAgICAgICAgY29tbWFuZDogJ3NzaCcsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL3NzaFwiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9jcm9uZCcsXG4gICAgICAgIGNvbW1hbmQ6ICdjcm9uJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS93YXp1aFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiAxLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkF1ZGl0OiBDb21tYW5kOiAvdXNyL3NiaW4vY3JvbmRcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vbHMnLFxuICAgICAgICBjb21tYW5kOiAnbHMnLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDYsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9sc1wiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcvc2Jpbi9jb25zb2xldHlwZSdcbiAgICAgICAgfSxcbiAgICAgICAgZXhlOiAnL3Vzci9zYmluL2NvbnNvbGV0eXBlJyxcbiAgICAgICAgY29tbWFuZDogJ2NvbnNvbGV0eXBlJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS93YXp1aFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiAxNixcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL2NvbnNvbGV0eXBlXCIsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgXCJhdWRpdFwiLFxuICAgICAgICBcImF1ZGl0X2NvbW1hbmRcIlxuICAgICAgXSxcbiAgICAgIGdkcHI6IFtcbiAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBkYXRhOiB7XG4gICAgICBhdWRpdDoge1xuICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgbmFtZTogJy9iaW4vYmFzaCdcbiAgICAgICAgfSxcbiAgICAgICAgZXhlOiAnL3Vzci9zYmluL2Jhc2gnLFxuICAgICAgICBjb21tYW5kOiAnYmFzaCcsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMSxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL2Jhc2hcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnL3Vzci9iaW4vaWQnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9pZCcsXG4gICAgICAgIGNvbW1hbmQ6ICdpZCcsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMTEsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9pZFwiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcvdXNyL2Jpbi9ncmVwJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vZ3JlcCcsXG4gICAgICAgIGNvbW1hbmQ6ICdncmVwJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS93YXp1aFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiAxMyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL2dyZXBcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnL3Vzci9iaW4vaG9zdG5hbWUnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9ob3N0bmFtZScsXG4gICAgICAgIGNvbW1hbmQ6ICdob3N0bmFtZScsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMTMsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9ob3N0bmFtZVwiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcvdXNyL2Jpbi9zaCdcbiAgICAgICAgfSxcbiAgICAgICAgZXhlOiAnL3Vzci9zYmluL3NoJyxcbiAgICAgICAgY29tbWFuZDogJ3NoJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS9zaFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiAxNyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL3NoXCIsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgXCJhdWRpdFwiLFxuICAgICAgICBcImF1ZGl0X2NvbW1hbmRcIlxuICAgICAgXSxcbiAgICAgIGdkcHI6IFtcbiAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIC8vICAge1xuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBhdWRpdDoge1xuICAvLyAgICAgICAgIHJlczogXCIxXCIsXG4gIC8vICAgICAgICAgaWQ6IFwiMTAwMjU1NlwiLFxuICAvLyAgICAgICAgIHR5cGU6IFwiQ09ORklHX0NIQU5HRVwiLFxuICAvLyAgICAgICAgIGxpc3Q6IFwiNFwiLFxuICAvLyAgICAgICAgIGtleTogXCJ3YXp1aF9maW1cIlxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHJ1bGU6IHtcbiAgLy8gaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAvLyAgICAgICBmaXJlZHRpbWVzOiAxMCxcbiAgLy8gICAgICAgbWFpbDogZmFsc2UsXG4gIC8vICAgICAgIGxldmVsOiAzLFxuICAvLyAgICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdGQ6IENvbmZpZ3VyYXRpb24gY2hhbmdlZFwiLFxuICAvLyAgICAgICBncm91cHM6IFtcbiAgLy8gICAgICAgICBcImF1ZGl0XCIsXG4gIC8vICAgICAgICAgXCJhdWRpdF9jb25maWd1cmF0aW9uXCJcbiAgLy8gICAgICAgXSxcbiAgLy8gICAgICAgZ3BnMTM6IFtcbiAgLy8gICAgICAgICBcIjEwLjFcIlxuICAvLyAgICAgICBdLFxuICAvLyAgICAgICBnZHByOiBbXG4gIC8vICAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAvLyAgICAgICBdXG4gIC8vICAgICB9LFxuICAvLyAgIH0sXG5dXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWNBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBSU8sTUFBTUMsUUFBUSxHQUFBQyxPQUFBLENBQUFELFFBQUEsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQztBQUM5RSxNQUFNRSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7QUFDbkQsTUFBTUMsU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7QUFFdEUsTUFBTUMsU0FBUyxHQUFBSCxPQUFBLENBQUFHLFNBQUEsR0FBRyxDQUFDO0VBQ3RCQyxJQUFJLEVBQUU7SUFDSkMsS0FBSyxFQUFFO01BQ0xDLElBQUksRUFBRTtRQUNKQyxJQUFJLEVBQUU7TUFDUixDQUFDO01BQ0RDLEdBQUcsRUFBRSxnQkFBZ0I7TUFDckJDLE9BQU8sRUFBRSxNQUFNO01BQ2ZDLE9BQU8sRUFBRSxLQUFLO01BQ2RDLEdBQUcsRUFBRSxhQUFhO01BQ2xCQyxJQUFJLEVBQUUsSUFBQUMsdUJBQWUsRUFBQ1gsU0FBUztJQUNqQztFQUNGLENBQUM7RUFDRFksSUFBSSxFQUFFO0lBQ0pDLEVBQUUsRUFBRSxJQUFBRix1QkFBZSxFQUFDWixNQUFNLENBQUM7SUFDM0JlLFVBQVUsRUFBRSxFQUFFO0lBQ2RDLElBQUksRUFBRSxLQUFLO0lBQ1hDLEtBQUssRUFBRSxDQUFDO0lBQ1JDLFdB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