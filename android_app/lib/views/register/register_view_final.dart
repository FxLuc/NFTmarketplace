import 'package:android_app/views_model/login/login_view_model.dart';
import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';

class RegisterViewFinal extends StatelessWidget {
  const RegisterViewFinal({Key? key, this.secretRecoveyPhrase})
      : super(key: key);
  final String? secretRecoveyPhrase;

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
                      'Congratulations',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXX,
                    ),
                    Text(
                      'Your passed the test - keep your seedphrase safe, it\'s your responsibility!',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeV,
                    ),
                    Text(
                      'Tips on storing it safely:',
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
                      '- Save a backup in multiple places.',
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
                      '- Never share the phrase with anyone.',
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
                      '- If you need to backup your phrase again, you canfin it in Account > Security',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXVII,
                        color: CustomColor.colorSecondary,
                      ),
                      textAlign: TextAlign.left,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXX,
                    ),
                    Text(
                      '* FINDEX cannot recover your seedphrase.',
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
                        login(context, secretRecoveyPhrase!, false);
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: CustomColor.colorPrimary,
                          padding: EdgeInsets.symmetric(
                            vertical: CustomSize.sizeX,
                            horizontal: CustomSize.sizeXX,
                          ),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                      child: Text(
                        'All Done',
                        style: TextStyle(
                          color: CustomColor.colorLight,
                          fontSize: CustomSize.sizeXVII,
                        ),
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
