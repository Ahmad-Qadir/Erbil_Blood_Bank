import 'package:flutter/material.dart';
import 'package:mobile/donor.dart';
import 'donor_service.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  static var username = "";
  static var password = "";
  bool checker = true;
  TextEditingController _usernameController = new TextEditingController();
  TextEditingController _passwordController = new TextEditingController();
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
              decoration:
                  InputDecoration(hintText: 'Username', labelText: "Username"),
              controller: _usernameController,
            ),
            Container(
              height: 20,
            ),
            TextField(
              decoration: InputDecoration(
                hintText: 'Password',
                labelText: "Password",
              ),
              controller: _passwordController,
              obscureText: true,
            ),
            Container(
              height: 20,
            ),
            Text(username),
            RaisedButton(
              child: Text("Log in"),
              onPressed: () async {
                setState(() {
                  username = _usernameController.text;
                  password = _passwordController.text;
                });
                if (_usernameController.text.length == 0 ||
                    _passwordController.text.length == 0) {
                  print("fileds is empty");
                } else {
                  ApiService.login(username, password).whenComplete(() {
                    return Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => getDonors(),
                      ),
                    );
                  });
                }
              },
            )
          ],
        ),
      ),
    );
  }
}
