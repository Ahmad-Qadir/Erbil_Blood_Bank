import 'package:flutter/material.dart';
import 'donor_service.dart';
import 'dart:convert';

class getDonors extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Donor List")),
      body: FutureBuilder(
        future: ApiService.getDonorList(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return ListView.builder(
              itemBuilder: (context, index) {
                return ListTile(
                  leading: Image.network(
                    'http://www.sclance.com/pngs/avatar-icon-png/avatar_icon_png_70860.png',
                  ),
                  title: Text(
                    snapshot.data[index]['name'] != null
                        ? snapshot.data[index]['name']
                        : "There is No data",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(snapshot.data[index]['_id'] != null
                      ? "ID:" + snapshot.data[index]['_id']
                      : "There is No data"),
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                getOneDonor(id: snapshot.data[index]['_id'])));
                  },
                  onLongPress: () {
                    ApiService.deleteUser(snapshot.data[index]['_id']);
                  },
                );
              },
              itemCount: snapshot.data.length,
            );
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}

class getOneDonor extends StatefulWidget {
  final String id;
  const getOneDonor({Key key, this.id}) : super(key: key);

  @override
  _getOneDonorState createState() => _getOneDonorState();
}

class _getOneDonorState extends State<getOneDonor> {
  @override
  Widget build(BuildContext context) {
    final myController = TextEditingController();
    final fullyname = TextEditingController();

    String _displayValue = "sdfsdf";
    var _fullname;

    return Scaffold(
      appBar: AppBar(
        title: Text('Specific Donor'),
      ),
      body: Column(
        children: <Widget>[
          FutureBuilder(
            future: ApiService.showsSpecificDonor(widget.id),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return Column(
                  children: <Widget>[
                    Text(
                      snapshot.data['name'],
                      style:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                    ),
                    Text(snapshot.data['_id']),
                  ],
                );
              }
              return Center(
                child: CircularProgressIndicator(),
              );
            },
          ),
          Container(
            height: 20,
          ),
          Divider(
            color: Colors.black,
            height: 3,
          ),
          Container(
            height: 20,
          ),
          TextField(
            decoration: InputDecoration(hintText: 'New Username'),
            controller: myController,
          ),
          TextField(
            decoration: InputDecoration(hintText: 'New name'),
            controller: fullyname,
          ),
          RaisedButton(
            child: Text("insert data into database"),
            onPressed: () {
              setState(() {
                _displayValue = myController.text;
                _fullname = fullyname.text;
              });
              ApiService.register(_displayValue, _fullname);
            },
          ),
          Text(_displayValue)
        ],
      ),
    );
  }
}
