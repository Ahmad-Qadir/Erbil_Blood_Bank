import 'package:flutter/material.dart';
import 'donor.dart';
import 'donor_service.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  bool _isLoading = false;
  TextEditingController _usernameController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Log in'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextField(
              decoration: InputDecoration(hintText: 'Username'),
              controller: _usernameController,
            ),
            Container(
              height: 20,
            ),
            _isLoading
                ? CircularProgressIndicator()
                : SizedBox(
                    height: 40,
                    width: double.infinity,
                    child: RaisedButton(
                      color: Colors.blue,
                      child: Text(
                        'Log in',
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () async {
                        setState(() {
                          _isLoading = true;
                        });
                        final users = await ApiService.getDonorList();
                        setState(() {
                          _isLoading = false;
                        });

                        if (users == null) {
                          showDialog(
                              context: context,
                              builder: (context) {
                                return AlertDialog(
                                  title: Text('Error'),
                                  content:
                                      Text("Check your internet connection"),
                                  actions: <Widget>[
                                    FlatButton(
                                      child: Text('Ok'),
                                      onPressed: () {
                                        Navigator.pop(context);
                                      },
                                    )
                                  ],
                                );
                              });
                          return;
                        } else {
                          final userWithUsernameExists = users.any(
                              (u) => u['username'] == _usernameController.text);
                          if (_usernameController.text.length == 0) {
                            showDialog(
                                context: context,
                                builder: (context) {
                                  return AlertDialog(
                                    title: Text('Error'),
                                    content: Text("field Should not be empty"),
                                    actions: <Widget>[
                                      FlatButton(
                                        child: Text('Ok'),
                                        onPressed: () {
                                          Navigator.pop(context);
                                        },
                                      )
                                    ],
                                  );
                                });
                          } else if (userWithUsernameExists) {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => getDonors()));
                          } else {
                            showDialog(
                                context: context,
                                builder: (context) {
                                  return AlertDialog(
                                    title: Text('Incorrect username'),
                                    content:
                                        Text('Try with a different username'),
                                    actions: <Widget>[
                                      FlatButton(
                                        child: Text('Ok'),
                                        onPressed: () {
                                          Navigator.pop(context);
                                        },
                                      )
                                    ],
                                  );
                                });
                          }
                        }
                      },
                    ),
                  )
          ],
        ),
      ),
    );
  }
}
