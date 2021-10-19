import React, {useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";

import Icon from 'react-native-vector-icons/AntDesign';

const Item = ({ id, IP, onDelete }) => {
    
    const [status, setStatus] = useState(1);
    const [blockHeight, setBlockHeight] = useState("");
    // 0 - active
    // 1 - not active

    useEffect(() => {
        checkStatus();
      }, []);

    const checkStatus = () => {
        //const url = "http://78.159.84.140:8888/status";
        const url = "http://"+IP+"/status";

        fetch(url)
        .then(response =>{
            return response.json()
        }).then(data => {
          // console.log(data)
            if(data.chainspec_name == "casper"){
                // console.log("return true")
                setBlockHeight(data.last_added_block_info.height);
                return true;
            }else{
              setBlockHeight("");
              return false;
            }
        }).catch(response => {
          return false;
        }).then(response => {
          if(response === true){
            setStatus(0); // active
          }
          else if(response === false){
            setStatus(1);  // not active
          }else{
            setStatus(1);
          }
    
        })
        
        return "hi";
      }
    
      const icons =  [
        {status:0, name: "checkcircleo", color: "#00ff00"},
        {status:1, name: "closecircleo", color: "#ff0000"},
        // {status:2, name: "questioncircleo", color: "#fad02C"},
    ]

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.completeCircle}>
            <Icon name={icons[status].name} size={30} color={icons[status].color} />
        </Text>
        <Text style={{ fontSize: 15 }}>{IP} { (blockHeight != "") ? "-" : ""  } {blockHeight}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete(id)}>
        <Icon style={styles.delete} name="delete" size={30} color="#e33057"/>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 100,
    marginRight: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  delete : {
    marginRight: 8,
  }
});

export default Item;