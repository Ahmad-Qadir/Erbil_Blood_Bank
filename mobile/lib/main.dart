import 'package:flutter/material.dart';
import 'package:mobile/donor.dart';
import 'Login.dart';

void main() {
  runApp(
    App(),
  );
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Donor List',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Login());
  }
}
