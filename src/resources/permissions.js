// const roles = require('./roles')
const roles = ['superadmin', 'admin', 'viewer', 'guest']

const usersResource = [ // all users endpoint actions, except creation
  'monuments:list',
  'monuments:get-by-id'
]


module.exports = {
  [roles[0]]: [
    ...usersResource,
    'monuments:create-new',
    'monuments:update-by-id',
    'monuments:delete-by-id',
    'users:list',
    'users:get-by-id',
    'users:create-new',
    'users:update-by-id',
    'users:delete-by-id'
  ],

  [roles[1]]: [
    ...usersResource,
    'monuments:create-new',
    'monuments:update-by-id'
  ],

  [roles[2]]: [
    ...usersResource
  ],

  [roles[3]]: [
    ...usersResource
  ]
}
