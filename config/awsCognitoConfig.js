const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_jz15Iq81N',
      userPoolClientId: 'o4bjeddt3pnf20kq2q1diokrh',
      loginWith: {
        username: true,
      },
    },
  },
};

export default awsConfig;