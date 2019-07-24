import 'package:flutter/material.dart';
import 'package:mobile/API_Services/donor_service.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'Drawer.dart';

class Recipient extends StatelessWidget {
  DateTime now = new DateTime.now();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Recipients List"),
        elevation: 10,
      ),
      drawer: CustomDrawer(),
      body: FutureBuilder(
          future: ApiService.getDonorList(),
          builder: (context, snapcshot) {
            if (snapcshot.hasData) {
              return ListView.builder(
                  itemCount: snapcshot.data.length,
                  itemBuilder: (context, index) {
                    return Card(
                      margin: EdgeInsets.only(left: 20, right: 20, top: 20),
                      elevation: 4,
                      child: Row(
                        children: <Widget>[
                          Image.asset(
                              "assets/${snapcshot.data[index]['bloodType']}.png",
                              height: 70),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                snapcshot.data[index]['name'],
                                style: TextStyle(
                                    fontSize:
                                        ScreenUtil.getInstance().setSp(35),
                                    letterSpacing: .6,
                                    fontWeight: FontWeight.bold),
                              ),
                              Row(
                                children: <Widget>[
                                  Text(
                                    "G.Blood: " +
                                        snapcshot.data[index]['bloodType'],
                                    style: TextStyle(
                                      fontSize:
                                          ScreenUtil.getInstance().setSp(30),
                                    ),
                                  ),
                                  SizedBox(
                                    width: 30,
                                  ),
                                  Text(
                                    "Location: " +
                                        snapcshot.data[index]['location'],
                                    style: TextStyle(
                                      fontSize:
                                          ScreenUtil.getInstance().setSp(30),
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: <Widget>[
                                  Text(
                                    "Date: " +
                                        snapcshot.data[index]['testDate'],
                                    style: TextStyle(
                                      fontSize:
                                          ScreenUtil.getInstance().setSp(30),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    );
                  });
            }
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  CircularProgressIndicator(),
                  SizedBox(
                    height: 20,
                  ),
                  Text("Loading... Please Wait!"),
                ],
              ),
            );
          }),
    );
  }
}
