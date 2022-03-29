import 'package:android_app/views/register/register_view.dart';
import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';
import '../../views_model/login/login_view_model.dart';

class LoginView extends StatelessWidget {
  static String routeName = "/login";
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

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKeyLogin = GlobalKey<FormState>();
  String? loginInput;
  String labelText = 'Secret Recovery Phrase';
  String hintText =
      'radar blur cabbage chef fix engine embark joy scheme fiction master release';
  String loginMethodName = 'or import using private key';
  bool isPrivateKey = false;

  void loginByPrivateKey() {
    setState(() {
      labelText = 'Private Key';
      hintText =
          '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db';
      loginMethodName = 'or import using Secret Recovery Phrase';
      isPrivateKey = true;
    });
  }

  void loginBySecrectRecoveryPhrase() {
    setState(() {
      labelText = 'Secret Recovery Phrase';
      hintText =
          'radar blur cabbage chef fix engine embark joy scheme fiction master release';
      loginMethodName = 'or import using Private Key';
      isPrivateKey = false;
    });
  }

  void changeLoginMethod() {
    (!isPrivateKey) ? loginByPrivateKey() : loginBySecrectRecoveryPhrase();
  }

  String? checkSecretRecoveryPhraseValid(String? value) {
    if (value!.isEmpty) {
      return 'Please enter your Secret Recovery Phrase';
    } else if (value.length < 36) {
      return 'Secret Recovery Phrase must have 12-words phrase';
    }
    return null;
  }

  String? checkPrivateKeyValid(String? value) {
    if (value!.isEmpty || value.length != 64) {
      return 'Please enter 64 characters of your Private Key';
    } else if (!RegExp(r'^[0-9a-fA-F]+$').hasMatch(value)) {
      return 'Private key must be hex characters';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKeyLogin,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Enter your $labelText to restore your account:',
            style: TextStyle(
              fontSize: CustomSize.sizeXVII,
              color: CustomColor.colorSecondary,
            ),
            // textAlign: TextAlign.center,
          ),
          SizedBox(
            height: CustomSize.sizeXX,
          ),
          TextFormField(
            style: TextStyle(color: CustomColor.colorDark),
            decoration: InputDecoration(
              prefixIcon: Icon(
                Icons.lock,
                color: CustomColor.colorSecondary,
              ),
              labelText: labelText,
              hintText: hintText,
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
            keyboardType: TextInputType.text,
            onSaved: (value) => loginInput = value,
            validator: (value) {
              return (isPrivateKey)
                  ? checkPrivateKeyValid(value)
                  : checkSecretRecoveryPhraseValid(value);
            },
          ),
          SizedBox(
            height: CustomSize.sizeXX,
          ),
          ElevatedButton(
            onPressed: () async {
              if (_formKeyLogin.currentState!.validate()) {
                _formKeyLogin.currentState!.save();
                login(context, loginInput!, isPrivateKey);
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
              'Login by $labelText',
              style: TextStyle(
                color: CustomColor.colorLight,
                fontSize: CustomSize.sizeXVII,
              ),
            ),
          ),
          TextButton(
            onPressed: () {
              changeLoginMethod();
            },
            child: Text(
              loginMethodName,
              style: TextStyle(
                color: CustomColor.colorSecondary,
                decoration: TextDecoration.underline,
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
