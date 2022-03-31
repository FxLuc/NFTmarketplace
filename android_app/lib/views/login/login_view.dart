import 'package:android_app/views/register/register_view.dart';
import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';
import 'login_form_view.dart';

class LoginView extends StatelessWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(color: CustomColor.colorLight),
            child: Center(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(CustomSize.sizeXXV),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: CustomSize.sizeXXV,
                        bottom: CustomSize.sizeXXX,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Image(
                            image: AssetImage('assets/brand/brand_V.png'),
                            fit: BoxFit.fitWidth,
                          ),
                        ],
                      ),
                    ),
                    Text(
                      'Welcome back!',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    const LoginForm(),
                    Padding(
                      padding: const EdgeInsets.only(
                        left: 7,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Text(
                                "Don't have an account?",
                                style: TextStyle(
                                    color: CustomColor.colorSecondary),
                              ),
                              TextButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const RegisterView()),
                                  );
                                },
                                child: Text(
                                  "Create new",
                                  style: TextStyle(
                                    color: CustomColor.colorPrimary,
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
