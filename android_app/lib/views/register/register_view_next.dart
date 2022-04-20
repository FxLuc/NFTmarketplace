import 'package:android_app/views/register/register_view_final.dart';
import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';

class RegisterViewNext extends StatelessWidget {
  const RegisterViewNext({Key? key, this.secretRecoveyPhrase})
      : super(key: key);
  final String? secretRecoveyPhrase;

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      //Prevent back button
      onWillPop: () {
        return Future(() => false);
      },
      child: Scaffold(
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
                        'Secrect Backup Phrase',
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
                        'Your serect backup phrase makes it easy to backup and restore your account.',
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
                        'WARNING: Never disclose your backup phrase. Anyone with this phrase can take your Ether forever.',
                        style: TextStyle(
                          fontSize: CustomSize.sizeXVII,
                          color: CustomColor.colorDanger,
                        ),
                        // textAlign: TextAlign.center,
                      ),
                      SizedBox(
                        height: CustomSize.sizeV,
                      ),
                      RegisterForm(
                          secretRecoveyPhrase: secretRecoveyPhrase),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RegisterForm extends StatefulWidget {
  const RegisterForm({Key? key, this.secretRecoveyPhrase})
      : super(key: key);

  final String? secretRecoveyPhrase;

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _formKeyRegister = GlobalKey<FormState>();
  final TextEditingController _secretRecoveyPhrase = TextEditingController();
  String? registerInput;

  String? checkSecretRecoveryPhraseValid(String? value) {
    if (value!.isEmpty) {
      return 'Please enter your Secret Recovery Phrase';
    } else if (value != _secretRecoveyPhrase.text) {
      return 'Secret Recovery Phrase must have 12-words phrase';
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    _secretRecoveyPhrase.text = widget.secretRecoveyPhrase!;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKeyRegister,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your secrect words:',
            style: TextStyle(
              fontSize: CustomSize.sizeXVII,
              color: CustomColor.colorSecondary,
            ),
            // textAlign: TextAlign.center,
          ),
          SizedBox(
            height: CustomSize.sizeV,
          ),
          TextFormField(
            controller: _secretRecoveyPhrase,
            style: TextStyle(color: CustomColor.colorSecondary),
            decoration: InputDecoration(
              border: const OutlineInputBorder(),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: CustomColor.colorSecondary,
                ),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: CustomColor.colorSecondary,
                  width: 2,
                ),
              ),
            ),
            maxLines: 2,
            keyboardType: TextInputType.text,
            readOnly: true,
          ),
          SizedBox(
            height: CustomSize.sizeXX,
          ),
          Text(
            'Confirm your Secrect Backup Phrase',
            style: TextStyle(
              fontSize: CustomSize.sizeXVII,
              color: CustomColor.colorSecondary,
            ),
            // textAlign: TextAlign.center,
          ),
          SizedBox(
            height: CustomSize.sizeV,
          ),
          TextFormField(
            style: TextStyle(color: CustomColor.colorDark),
            decoration: InputDecoration(
              border: const OutlineInputBorder(),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: CustomColor.colorSecondary,
                ),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: CustomColor.colorSecondary,
                  width: 2,
                ),
              ),
            ),
            maxLines: 2,
            keyboardType: TextInputType.text,
            onSaved: (value) => registerInput = value,
            validator: (value) {
              return checkSecretRecoveryPhraseValid(value);
            },
          ),
          SizedBox(
            height: CustomSize.sizeXX,
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKeyRegister.currentState!.validate()) {
                _formKeyRegister.currentState!.save();
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => RegisterViewFinal(secretRecoveyPhrase: widget.secretRecoveyPhrase)),
                );
              }
            },
            style: TextButton.styleFrom(
                backgroundColor: CustomColor.colorPrimary,
                padding: EdgeInsets.symmetric(
                  vertical: CustomSize.sizeX,
                  horizontal: CustomSize.sizeXX,
                ),
                tapTargetSize: MaterialTapTargetSize.shrinkWrap),
            child: Text(
              'Continue',
              style: TextStyle(
                color: CustomColor.colorLight,
                fontSize: CustomSize.sizeXVII,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
