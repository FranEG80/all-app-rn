import { useState } from 'react';
import { 
    FlatList, 
    Text, 
    View, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Alert
} from 'react-native'

function Library({data, columns}: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleFlatlist}>SCORM Library demo</Text>
            <FlatList
                key={`flatlist-${columns}`}
                columnWrapperStyle={{gap: 15}}
                contentContainerStyle={styles.flatlist}
                numColumns={columns}
                data={data}
                renderItem={({item}) => (
                    <Item 
                        name={item.title}
                        cover={item.thumbnail}
                        units={item.units}
                        isbns={item.isbns}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}


const Item = ({name, cover, lang, isbns, units}: any) => {
    const [isDownloaded, setIsDownloaded] = useState(false)

    const handleDonwload = (action='download') => {
        if (action=='download') {
            Alert.alert('Vamos a descargar la unidad llamada: ' + name)
            setIsDownloaded(true)
        }
        if (action == 'view') {
            Alert.alert('Acción no implementada aún')
        }
        if (action == 'delete') {
            Alert.alert('Vamos a eliminar la descarga del libro llamdo: ' + name)
            setIsDownloaded(false)
        }
    }

    return (
        <View style={styles.item}>
          <Image style={styles.image} source={{uri: cover}} height={175} />
          <View style={{paddingHorizontal: 5, flex: 1}}>
            <Text numberOfLines={2} ellipsizeMode='tail'  style={styles.title}>{name}</Text>
            <View style={styles.extra}>
                <Text style={styles.extra_text}>{isbns.join('-')}</Text>
                <Text style={styles.extra_text}>Unit {units.join(', ud')}</Text>
            </View>
          </View>
          <View>
            {isDownloaded 
                ? (
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <TouchableOpacity 
                            style={[styles.button, {flex: 1, backgroundColor: 'dodgerblue'}]}
                            onPress={() => handleDonwload('view')}
                        >
                            <Text style={{color: 'white', textAlign: 'center'}}>Ver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {backgroundColor: 'red', paddingHorizontal: 10}]}
                            onPress={() => handleDonwload('delete')}
                        >
                            <Text style={{color: 'white', textAlign: 'center'}}>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => handleDonwload('download')}
                    >
                        <Text style={{color: 'white', textAlign: 'center'}}>Descargar</Text>
                    </TouchableOpacity>
                )
            }
          </View>
        </View>
      )
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 0,
        backgroundColor: '#dfdfdf',
        marginBottom: 10,
        flex: 1
    },
    extra: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    extra_text: {
        fontSize: 14, 
        color: 'grey',
        textAlign: 'right'
    },
    item: {
        flex:1,
       flexDirection: 'column',
       backgroundColor: 'white',
       gap: 3
    },
    titleFlatlist: {
        textAlign: 'center',
        // color: 'teal',
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontSize: 32, 
        fontWeight: 'bold'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      flex:1,
    },
    image: {
        objectFit: 'cover',
        width: '100%'
    },
    flatlist: {
        width: '100%',
        gap: 15,
    },
    button: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: 'teal',
        borderRadius: 3,
    }
  });

export default Library