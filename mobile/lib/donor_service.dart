import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:io';

class Urls {
  static const BASE_API_DONOR_URL = "http://192.168.100.3:3000/donor";
}

class ApiService {
  static Future<dynamic> _get(String url) async {
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        return null;
      }
    } catch (ex) {
      return null;
    }
  }

  static Future<dynamic> _post(String url, var data) async {
    Map<String, String> header = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    };
    http.post(url, headers: header, body: data).then((response) {
      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");
      return response.statusCode;
    }).catchError((ex) {
      print(ex);
    });
  }

  static Future<List<dynamic>> getDonorList() async {
    return await _get('${Urls.BASE_API_DONOR_URL}/shows');
  }

  static Future<dynamic> showsSpecificDonor(var postId) async {
    return await _get('${Urls.BASE_API_DONOR_URL}/shows/$postId');
  }

  static Future<dynamic> register(var data) async {
    return await _post("${Urls.BASE_API_DONOR_URL}/register", data);
  }

  static Future<dynamic> login(var username, var password) async {
    var data = json.encode({"username": "$username", "password": "$password"});
    return await _post("${Urls.BASE_API_DONOR_URL}/login", data);
  }
}
