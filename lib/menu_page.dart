import 'circular_image.dart';
import 'package:flutter/material.dart';

class MenuScreen extends StatelessWidget {
  final String imageUrl =
      "http://www.themoorecountynews.com/wp-content/uploads/2016/12/12-08-16-Red-Cross-Blood-Donation-LOGO.jpg";

  final List<MenuItem> options = [
    MenuItem(Icons.home, 'Home', Pages()),
    MenuItem(Icons.person_add, 'Donor Login', Pages()),
    MenuItem(Icons.local_hospital, 'Blood Request', Pages()),
    MenuItem(Icons.map, 'Camps', Pages()),
    MenuItem(Icons.contact_phone, 'Contact us', Pages()),
    MenuItem(Icons.people, 'Staff', Pages()),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
          top: 62,
          left: 32,
          bottom: 8,
          right: MediaQuery.of(context).size.width / 2.9),
      color: Colors.redAccent,
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(right: 16),
                child: CircularImage(
                  NetworkImage(imageUrl),
                ),
              ),
              Text(
                'Blood Donor',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                ),
              )
            ],
          ),
          Spacer(),
          Column(
            children: options.map((item) {
              return ListTile(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => item.tab),
                  );
                },
                leading: Icon(
                  item.icon,
                  color: Colors.white,
                  size: 20,
                ),
                title: Text(
                  item.title,
                  style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
              );
            }).toList(),
          ),
          Spacer(),
          ListTile(
            leading: Icon(
              Icons.headset_mic,
              color: Colors.white,
              size: 20,
            ),
            title: Text('Support',
                style: TextStyle(fontSize: 14, color: Colors.white)),
          ),
          ListTile(
            onTap: () {},
            leading: Icon(
              Icons.info,
              color: Colors.white,
              size: 20,
            ),
            title: Text('About',
                style: TextStyle(fontSize: 14, color: Colors.white)),
          ),
        ],
      ),
    );
  }
}

class MenuItem {
  String title;
  IconData icon;
  var tab;
  MenuItem(this.icon, this.title, this.tab);
}

class Pages extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        child: Text("Hello Pages"),
      ),
    );
  }
}
