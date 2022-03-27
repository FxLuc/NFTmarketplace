import 'package:flutter/material.dart';
import '../../widgets/snack_bar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void login(BuildContext context, String? loginInput) async {
  try {
    final response = await http.post(
      // edit this path
      Uri.parse('http://127.0.0.1:3000/signin'),
      body: {
        'loginInput': loginInput,
      },
    );
    if (json.decode(response.body)['signin_state']) {
      // final ResponseBody dataResponseBody =
      //   ResponseBody.fromJson(json.decode(response.body));
      // final userName = dataResponseBody.user.name;
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'đã đăng nhập',
          'OK',
        ),
      );
      // Navigator.pushReplacementNamed(context, HomeScreen.routeName);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        snackBarControl(
          'Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại',
          'OK',
        ),
      );
    }
  } catch (e) {
    ScaffoldMessenger.of(context).showSnackBar(
      snackBarControl(
        'Đăng nhập không thành công, vui lòng kiểm tra kết nối mạng',
        'OK',
      ),
    );
  }
}