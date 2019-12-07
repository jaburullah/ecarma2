import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  logoSize: { resizeMode: 'stretch', height: 90, width: 150 },
  inputParentContainer: {
    flex: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtMobileNo: {
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
    padding: 5,
    width: 200,
    marginVertical: 25,
  },
  txtPassword: {
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
    padding: 5,
    marginVertical: 25,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    flex: 1,
  },
  versionDetailContainer: {
    alignItems: 'center',
    flex: 1,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: 'blue'
  },
  versionDetail: {
    fontSize: 12,
    color: '#969695'
  }
});
