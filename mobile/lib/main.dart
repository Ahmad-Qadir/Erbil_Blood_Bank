import 'menu_page.dart';
import 'package:flutter/material.dart';
import 'zoom_scaffold.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Zoom Menu',
      theme: new ThemeData(
        primaryColor: Colors.redAccent,
      ),
      home: new MyHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return ZoomScaffold(
      menuScreen: MenuScreen(),
      contentScreen: Layout(
          contentBuilder: (cc) => Container(
                color: Colors.grey[200],
                child: Container(
                  color: Colors.grey[200],
                ),
              )),
    );
  }
}
