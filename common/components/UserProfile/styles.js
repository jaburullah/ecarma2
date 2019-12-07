import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    parentContainer: { flex: 1, },
    container: { flex: 1, marginHorizontal: 30 },
    rowStyle1: { flex: 1, justifyContent: 'center', marginBottom: 20, marginTop: 20 },
    rowStyle2: { flex: 2, justifyContent: 'center', marginBottom: 20 },
    rowStyle3: { flex: 3, justifyContent: 'flex-start', },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    textInputStyle: {
        textAlign: 'left',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#482114',
        marginBottom: 10
    }
});