import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  parentContainer: { flex: 1 },
  container: { flex: 1, marginHorizontal: 30 },
  rowStyle1: { flex: 1, justifyContent: 'center' },
  uploadIconsContainer: { flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  uploadTextContainer: { flex: 5, justifyContent: 'center', alignItems: 'flex-start', },
  icon1: { marginRight: 10 },
  uploadText: { fontSize: 14, fontStyle: 'italic', paddingLeft: 10 },
  rowStyle2: { flex: 1, flexDirection: 'row', justifyContent: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  title: { fontSize: 16, fontWeight: 'normal' },
  rowStyle4: { flex: 3 },
  magrinBottom10: { marginBottom: 10 },
  textArea: {
    borderStyle: 'solid',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dbd9d9',
    flex: 1
  },
  rowStyle3: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    marginRight: 10
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  radioButtons: {

    flexDirection: 'row',
    alignItems: 'center',

  },
  radioButtonText: { marginLeft: 6, fontSize: 14 },

});
