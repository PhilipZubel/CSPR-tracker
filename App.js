import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import db from "./services/db";
import validateIPAddress from "./services/validateIP";
import Items from "./components/Items";

// console.clear();

export default function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch();
    create_table();

    return () => (mounted = false);
  }, []);

  function fetch() {
    db.fetch()
      .then((rows) => setData(rows))
      .catch((error) => Alert.alert(error));
  }

  function add() {

    let isValid = validateIPAddress(value);

    if(!isValid){
      Alert.alert(
        "IP address '"+value+"' is not valid",
        "example: 123.45.67.89:9999",
      )
      setValue("")
    }else{
      db.add(value)
      .then(() => {
        setValue("");
        fetch();
      })
      .catch((error) => Alert.alert(error));
      }
    }

    

  function remove(id) {
    db.delete(id)
      .then(fetch)
      .catch((error) => Alert.alert(error));
  }

  function create_table() {
    async function check_table() {
        db.create_table()
          .catch((error) => Alert.alert(error));
      }

    check_table();
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.header}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>CSPR servers:</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#841584", marginRight: 14 }}>
            {data.length}
          </Text>
        </View>
        {data &&
          data.map(({ id, name }) => (
            <Items key={id} id={id} IP={name} onDelete={remove} />
          ))}

        <TextInput
          value={value}
          style={styles.input}
          placeholder="Add IP address here..."
          onChangeText={setValue}
        />
        <Button title="Add" color="#841584" onPress={add} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: "#fff",
  },
  input: {
    padding: 10,
    marginTop: 20,
    borderColor: "#B6C",
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },

});
