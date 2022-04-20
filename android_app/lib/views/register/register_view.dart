import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';
import '../../views_model/register/register_view_model.dart';

class RegisterView extends StatelessWidget {
  const RegisterView({Key? key}) : super(key: key);

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
                      'Welcome new user!',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeX,
                    ),
                    Text(
                      'FINDEX would like to gather usage data to better understand how our users interact with the extension. This data will be used in to continually improve the usability and user experience of our pproduct and the Ethereum ecosystem.',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      textAlign: TextAlign.justify,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    Text(
                      'FINDEX will:',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.justify,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    Text(
                      '- Never collect keys, addresses, transaction, balances, hashes, or any personal information.',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      textAlign: TextAlign.left,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    Text(
                      '- Never collect your full IP address',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      textAlign: TextAlign.left,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    Text(
                      '- Never sell data for profit. Ever!',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      textAlign: TextAlign.left,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXX,
                    ),
                    ElevatedButton(
                      onPressed: () {
                        register(context);
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: CustomColor.colorPrimary,
                          padding: EdgeInsets.symmetric(
                            vertical: CustomSize.sizeX,
                            horizontal: CustomSize.sizeXX,
                          ),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                      child: Text(
                        'Create',
                        style: TextStyle(
                          color: CustomColor.colorLight,
                          fontSize: CustomSize.sizeXVII,
                        ),
                      ),
                    ),
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
                                'Already have an account?',
                                style: TextStyle(
                                    color: CustomColor.colorSecondary),
                              ),
                              TextButton(
                                onPressed: () {
                                  Navigator.pop(context);
                                },
                                child: Text(
                                  'Login here',
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
