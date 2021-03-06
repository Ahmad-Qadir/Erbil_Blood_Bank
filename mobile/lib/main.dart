import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'Widgets/FormCard.dart';
import 'recipient.dart';

void main() => runApp(
      MaterialApp(
        home: Login(),
        debugShowCheckedModeBanner: false,
      ),
    );

class Login extends StatefulWidget {
  @override
  _LoginState createState() => new _LoginState();
}

class _LoginState extends State<Login> {
  Widget horizontalLine() => Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Container(
          width: ScreenUtil.getInstance().setWidth(120),
          height: 1.0,
          color: Colors.black26.withOpacity(.2),
        ),
      );
  @override
  Widget build(BuildContext context) {
    ScreenUtil.instance = ScreenUtil.getInstance()..init(context);
    ScreenUtil.instance =
        ScreenUtil(width: 750, height: 1334, allowFontScaling: true);
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomPadding: false,
      body: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(top: 20.0),
                child: Image.asset("assets/image_01.png"),
              ),
              Expanded(
                child: Container(),
              ),
              Opacity(
                opacity: 0.5,
                child: Image.asset("assets/image_02.png"),
              )
            ],
          ),
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.only(left: 28.0, right: 28.0, top: 60.0),
              child: Column(
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Image.asset(
                        "assets/logo.png",
                        width: ScreenUtil.getInstance().setWidth(110),
                        height: ScreenUtil.getInstance().setHeight(110),
                      ),
                      SizedBox(
                        width: 15,
                      ),
                      Text(
                        "Blood Bank",
                        style: TextStyle(
                            fontFamily: "Poppins-Bold",
                            fontSize: ScreenUtil.getInstance().setSp(46),
                            letterSpacing: .6,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: ScreenUtil.getInstance().setHeight(180),
                  ),
                  FormCard(),
                  SizedBox(height: ScreenUtil.getInstance().setHeight(40)),
                  Center(
                    child: InkWell(
                      child: Container(
                        width: ScreenUtil.getInstance().setWidth(330),
                        height: ScreenUtil.getInstance().setHeight(100),
                        decoration: BoxDecoration(
                            gradient: LinearGradient(
                                colors: [Color(0xFF17ead9), Color(0xFF6078ea)]),
                            borderRadius: BorderRadius.circular(6.0),
                            boxShadow: [
                              BoxShadow(
                                  color: Color(0xFF6078ea).withOpacity(.3),
                                  offset: Offset(0.0, 8.0),
                                  blurRadius: 8.0)
                            ]),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            highlightColor: Colors.redAccent,
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => Recipient()),
                              );
                            },
                            child: Center(
                              child: Text("SIGNIN",
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontFamily: "Poppins-Bold",
                                      fontSize: 18,
                                      letterSpacing: 1.0)),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: ScreenUtil.getInstance().setHeight(30),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        "New User? ",
                        style: TextStyle(fontFamily: "Poppins-Medium"),
                      ),
                      InkWell(
                        onTap: () {},
                        child: Text("SignUp",
                            style: TextStyle(
                                color: Colors.redAccent,
                                fontFamily: "Poppins-Bold")),
                      )
                    ],
                  ),
                  SizedBox(
                    height: ScreenUtil.getInstance().setHeight(20),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      horizontalLine(),
                      Text("Partners",
                          style: TextStyle(
                              fontSize: 16.0, fontFamily: "Poppins-Medium")),
                      horizontalLine()
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Image.asset(
                        "assets/flag.png",
                        width: ScreenUtil.getInstance().setWidth(170),
                        height: ScreenUtil.getInstance().setHeight(170),
                      ),
                      SizedBox(
                        width: 20,
                      ),
                      Image.asset(
                        "assets/krg.png",
                        width: ScreenUtil.getInstance().setWidth(200),
                        height: ScreenUtil.getInstance().setHeight(200),
                      ),
                      SizedBox(
                        width: 20,
                      ),
                      Image.asset(
                        "assets/ebb.png",
                        width: ScreenUtil.getInstance().setWidth(170),
                        height: ScreenUtil.getInstance().setHeight(170),
                      ),
                    ],
                  )
                ],
              ),
            ),
          )
        ],
      ),
      
    );
  }
}
