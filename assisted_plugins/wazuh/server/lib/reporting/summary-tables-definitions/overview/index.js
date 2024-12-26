"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _aggregation_fields = require("../aggregation_fields");
const generalAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const awsAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const fimAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['syscheck.path'], _aggregation_fields.AggregationFields['syscheck.event']]
};
const gcpAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const officeAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const pciAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.pci_dss'], _aggregation_fields.AggregationFields['rule.description']]
};
const gdprAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.gdpr'], _aggregation_fields.AggregationFields['rule.description']]
};
const nistAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.nist_800_53'], _aggregation_fields.AggregationFields['rule.level']]
};
const hipaaAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.hipaa'], _aggregation_fields.AggregationFields['rule.level']]
};
const tscAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.tsc'], _aggregation_fields.AggregationFields['rule.description']]
};
const virustotalAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const osqueryAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['data.osquery.name'], _aggregation_fields.AggregationFields['data.osquery.action'], _aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['data.osquery.pack'], _aggregation_fields.AggregationFields['data.osquery.calendarTime']]
};
const mitreAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.id'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['rule.level']]
};
const ciscatAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['data.cis.rule_title'], _aggregation_fields.AggregationFields['data.cis.group'], _aggregation_fields.AggregationFields['data.cis.result']]
};
const pmAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['data.title']]
};
const dockerAlertsSummary = {
  title: 'Events summary',
  aggs: [_aggregation_fields.AggregationFields['data.docker.Actor.Attributes.name'], _aggregation_fields.AggregationFields['data.docker.Action'], _aggregation_fields.AggregationFields['timestamp']]
};
const githubAlertsSummary = {
  title: 'Alerts summary',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['data.github.org'], _aggregation_fields.AggregationFields['rule.description']]
};

// 'Wazuh-App-Overview-OSCAP-Last-alerts'
const oscapLastAlerts = {
  title: 'Last alerts',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['data.oscap.check.title'], _aggregation_fields.AggregationFields['data.oscap.scan.profile.title']]
};

// 'Wazuh-App-Overview-Audit-Last-alerts'
const auditLastAlerts = {
  title: 'Last alerts',
  aggs: [_aggregation_fields.AggregationFields['agent.name'], _aggregation_fields.AggregationFields['rule.description'], _aggregation_fields.AggregationFields['data.audit.exe']]
};
var _default = exports.default = {
  aws: [awsAlertsSummary],
  ciscat: [ciscatAlertsSummary],
  docker: [dockerAlertsSummary],
  fim: [fimAlertsSummary],
  gcp: [gcpAlertsSummary],
  gdpr: [gdprAlertsSummary],
  general: [generalAlertsSummary],
  github: [githubAlertsSummary],
  hipaa: [hipaaAlertsSummary],
  mitre: [mitreAlertsSummary],
  nist: [nistAlertsSummary],
  office: [officeAlertsSummary],
  oscap: [oscapLastAlerts],
  osquery: [osqueryAlertsSummary],
  pci: [pciAlertsSummary],
  pm: [pmAlertsSummary],
  tsc: [tscAlertsSummary],
  virustotal: [virustotalAlertsSummary],
  audit: [auditLastAlerts]
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYWdncmVnYXRpb25fZmllbGRzIiwicmVxdWlyZSIsImdlbmVyYWxBbGVydHNTdW1tYXJ5IiwidGl0bGUiLCJhZ2dzIiwiQWdncmVnYXRpb25GaWVsZHMiLCJhd3NBbGVydHNTdW1tYXJ5IiwiZmltQWxlcnRzU3VtbWFyeSIsImdjcEFsZXJ0c1N1bW1hcnkiLCJvZmZpY2VBbGVydHNTdW1tYXJ5IiwicGNpQWxlcnRzU3VtbWFyeSIsImdkcHJBbGVydHNTdW1tYXJ5IiwibmlzdEFsZXJ0c1N1bW1hcnkiLCJoaXBhYUFsZXJ0c1N1bW1hcnkiLCJ0c2NBbGVydHNTdW1tYXJ5IiwidmlydXN0b3RhbEFsZXJ0c1N1bW1hcnkiLCJvc3F1ZXJ5QWxlcnRzU3VtbWFyeSIsIm1pdHJlQWxlcnRzU3VtbWFyeSIsImNpc2NhdEFsZXJ0c1N1bW1hcnkiLCJwbUFsZXJ0c1N1bW1hcnkiLCJkb2NrZXJBbGVydHNTdW1tYXJ5IiwiZ2l0aHViQWxlcnRzU3VtbWFyeSIsIm9zY2FwTGFzdEFsZXJ0cyIsImF1ZGl0TGFzdEFsZXJ0cyIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsImRlZmF1bHQiLCJhd3MiLCJjaXNjYXQiLCJkb2NrZXIiLCJmaW0iLCJnY3AiLCJnZHByIiwiZ2VuZXJhbCIsImdpdGh1YiIsImhpcGFhIiwibWl0cmUiLCJuaXN0Iiwib2ZmaWNlIiwib3NjYXAiLCJvc3F1ZXJ5IiwicGNpIiwicG0iLCJ0c2MiLCJ2aXJ1c3RvdGFsIiwiYXVkaXQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJpbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ2dyZWdhdGlvbkZpZWxkcyB9IGZyb20gJy4uL2FnZ3JlZ2F0aW9uX2ZpZWxkcyc7XG5jb25zdCBnZW5lcmFsQWxlcnRzU3VtbWFyeSA9IHtcbiAgdGl0bGU6ICdBbGVydHMgc3VtbWFyeScsXG4gIGFnZ3M6IFtcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5pZCddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmRlc2NyaXB0aW9uJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUubGV2ZWwnXSxcbiAgXVxufVxuXG5jb25zdCBhd3NBbGVydHNTdW1tYXJ5ID0ge1xuICB0aXRsZTogJ0FsZXJ0cyBzdW1tYXJ5JyxcbiAgYWdnczogW1xuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmlkJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuZGVzY3JpcHRpb24nXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5sZXZlbCddLFxuICBdXG59XG5cbmNvbnN0IGZpbUFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2FnZW50Lm5hbWUnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snc3lzY2hlY2sucGF0aCddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydzeXNjaGVjay5ldmVudCddLFxuICBdXG59XG5cbmNvbnN0IGdjcEFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuaWQnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5kZXNjcmlwdGlvbiddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmxldmVsJ10sXG4gIF1cbn1cblxuY29uc3Qgb2ZmaWNlQWxlcnRzU3VtbWFyeSA9IHtcbiAgdGl0bGU6ICdBbGVydHMgc3VtbWFyeScsXG4gIGFnZ3M6IFtcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5pZCddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmRlc2NyaXB0aW9uJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUubGV2ZWwnXSxcbiAgXVxufVxuXG5jb25zdCBwY2lBbGVydHNTdW1tYXJ5ID0ge1xuICB0aXRsZTogJ0FsZXJ0cyBzdW1tYXJ5JyxcbiAgYWdnczogW1xuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydhZ2VudC5uYW1lJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUucGNpX2RzcyddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmRlc2NyaXB0aW9uJ10sXG4gIF1cbn1cblxuY29uc3QgZ2RwckFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2FnZW50Lm5hbWUnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5nZHByJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuZGVzY3JpcHRpb24nXSxcbiAgXVxufVxuXG5jb25zdCBuaXN0QWxlcnRzU3VtbWFyeSA9IHtcbiAgdGl0bGU6ICdBbGVydHMgc3VtbWFyeScsXG4gIGFnZ3M6IFtcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snYWdlbnQubmFtZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLm5pc3RfODAwXzUzJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUubGV2ZWwnXSxcbiAgXVxufVxuXG5jb25zdCBoaXBhYUFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2FnZW50Lm5hbWUnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5oaXBhYSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmxldmVsJ10sXG4gIF1cbn1cblxuY29uc3QgdHNjQWxlcnRzU3VtbWFyeSA9IHtcbiAgdGl0bGU6ICdBbGVydHMgc3VtbWFyeScsXG4gIGFnZ3M6IFtcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snYWdlbnQubmFtZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLnRzYyddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmRlc2NyaXB0aW9uJ10sXG4gIF1cbn1cblxuY29uc3QgdmlydXN0b3RhbEFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuaWQnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5kZXNjcmlwdGlvbiddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmxldmVsJ10sXG4gIF1cbn1cblxuY29uc3Qgb3NxdWVyeUFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2RhdGEub3NxdWVyeS5uYW1lJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2RhdGEub3NxdWVyeS5hY3Rpb24nXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snYWdlbnQubmFtZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLm9zcXVlcnkucGFjayddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLm9zcXVlcnkuY2FsZW5kYXJUaW1lJ10sXG4gIF1cbn1cblxuY29uc3QgbWl0cmVBbGVydHNTdW1tYXJ5ID0ge1xuICB0aXRsZTogJ0FsZXJ0cyBzdW1tYXJ5JyxcbiAgYWdnczogW1xuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydydWxlLmlkJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuZGVzY3JpcHRpb24nXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5sZXZlbCddLFxuICBdXG59XG5jb25zdCBjaXNjYXRBbGVydHNTdW1tYXJ5ID0ge1xuICB0aXRsZTogJ0FsZXJ0cyBzdW1tYXJ5JyxcbiAgYWdnczogW1xuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLmNpcy5ydWxlX3RpdGxlJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2RhdGEuY2lzLmdyb3VwJ10sXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2RhdGEuY2lzLnJlc3VsdCddLFxuICBdXG59XG5jb25zdCBwbUFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnQWxlcnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ3J1bGUuZGVzY3JpcHRpb24nXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snZGF0YS50aXRsZSddLFxuICBdXG59XG5cbmNvbnN0IGRvY2tlckFsZXJ0c1N1bW1hcnkgPSB7XG4gIHRpdGxlOiAnRXZlbnRzIHN1bW1hcnknLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2RhdGEuZG9ja2VyLkFjdG9yLkF0dHJpYnV0ZXMubmFtZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLmRvY2tlci5BY3Rpb24nXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sndGltZXN0YW1wJ10sXG4gIF1cbn1cblxuY29uc3QgZ2l0aHViQWxlcnRzU3VtbWFyeSA9IHtcbiAgdGl0bGU6ICdBbGVydHMgc3VtbWFyeScsXG4gIGFnZ3M6IFtcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snYWdlbnQubmFtZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLmdpdGh1Yi5vcmcnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5kZXNjcmlwdGlvbiddLFxuICBdXG59XG5cbi8vICdXYXp1aC1BcHAtT3ZlcnZpZXctT1NDQVAtTGFzdC1hbGVydHMnXG5jb25zdCBvc2NhcExhc3RBbGVydHMgPSB7XG4gIHRpdGxlOiAnTGFzdCBhbGVydHMnLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2FnZW50Lm5hbWUnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1snZGF0YS5vc2NhcC5jaGVjay50aXRsZSddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLm9zY2FwLnNjYW4ucHJvZmlsZS50aXRsZSddLFxuICBdXG59XG5cbi8vICdXYXp1aC1BcHAtT3ZlcnZpZXctQXVkaXQtTGFzdC1hbGVydHMnXG5jb25zdCBhdWRpdExhc3RBbGVydHMgPSB7XG4gIHRpdGxlOiAnTGFzdCBhbGVydHMnLFxuICBhZ2dzOiBbXG4gICAgQWdncmVnYXRpb25GaWVsZHNbJ2FnZW50Lm5hbWUnXSxcbiAgICBBZ2dyZWdhdGlvbkZpZWxkc1sncnVsZS5kZXNjcmlwdGlvbiddLFxuICAgIEFnZ3JlZ2F0aW9uRmllbGRzWydkYXRhLmF1ZGl0LmV4ZSddLFxuICBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXdzOiBbYXdzQWxlcnRzU3VtbWFyeV0sXG4gIGNpc2NhdDogW2Npc2NhdEFsZXJ0c1N1bW1hcnldLFxuICBkb2NrZXI6IFtkb2NrZXJBbGVydHNTdW1tYXJ5XSxcbiAgZmltOiBbZmltQWxlcnRzU3VtbWFyeV0sXG4gIGdjcDogW2djcEFsZXJ0c1N1bW1hcnldLFxuICBnZHByOiBbZ2RwckFsZXJ0c1N1bW1hcnldLFxuICBnZW5lcmFsOiBbZ2VuZXJhbEFsZXJ0c1N1bW1hcnldLFxuICBnaXRodWI6IFtnaXRodWJBbGVydHNTdW1tYXJ5XSxcbiAgaGlwYWE6IFtoaXBhYUFsZXJ0c1N1bW1hcnldLFxuICBtaXRyZTogW21pdHJlQWxlcnRzU3VtbWFyeV0sXG4gIG5pc3Q6IFtuaXN0QWxlcnRzU3VtbWFyeV0sXG4gIG9mZmljZTogW29mZmljZUFsZXJ0c1N1bW1hcnldLFxuICBvc2NhcDogW29zY2FwTGFzdEFsZXJ0c10sXG4gIG9zcXVlcnk6IFtvc3F1ZXJ5QWxlcnRzU3VtbWFyeV0sXG4gIHBjaTogW3BjaUFsZXJ0c1N1bW1hcnldLFxuICBwbTogW3BtQWxlcnRzU3VtbWFyeV0sXG4gIHRzYzogW3RzY0FsZXJ0c1N1bW1hcnldLFxuICB2aXJ1c3RvdGFsOiBbdmlydXN0b3RhbEFsZXJ0c1N1bW1hcnldLFxuICBhdWRpdDogW2F1ZGl0TGFzdEFsZXJ0c10sXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLG1CQUFBLEdBQUFD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