const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_fvsPJVeqj',
      userPoolClientId: '5mb7uajmc0n80rviv1am2dh48k',
      loginWith: {
        username: true,
      },
    },
  },
};

export default awsConfig;