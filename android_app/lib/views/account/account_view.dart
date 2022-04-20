import 'package:android_app/models/account.dart';
import 'package:android_app/utils/constants/theme.dart';
import 'package:android_app/views/login/login_view.dart';
import 'package:ethers/ethers.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../../utils/clipboard.dart';
import '../../utils/ethereum.dart';
import '../../views_model/login/login_wallet.dart';
import '../../widgets/circular_progress_indicator.dart';

class AccountView extends StatefulWidget {
  const AccountView({Key? key}) : super(key: key);
  @override
  State<AccountView> createState() => _AccountViewState();
}

class _AccountViewState extends State<AccountView> {
  late Future<BigInt> accountBalance;

  @override
  Widget build(BuildContext context) {
    () async {
      Future<BigInt> accountBalanceResult;
      try {
        accountBalanceResult = getBalance(
            context.watch<LoginWallet>().ethProvider,
            context.watch<LoginWallet>().loginAccount.id);
        accountBalance = accountBalanceResult;
      } catch (err) {
        throw Exception(err);
      }
    }();
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
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: CustomSize.sizeXXV,
                        bottom: CustomSize.sizeXXX,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.network(
                            '${context.watch<LoginWallet>().loginAccount.avatar}',
                            fit: BoxFit.fitHeight,
                            height: CustomSize.sizeC,
                          ),
                        ],
                      ),
                    ),
                    Text(
                      '${context.watch<LoginWallet>().loginAccount.name}',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXX,
                    ),
                    ElevatedButton(
                      onPressed: () {
                        copyToClipboard(
                          context,
                          context.read<LoginWallet>().loginAccount.id,
                        );
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: CustomColor.colorLight,
                          padding: EdgeInsets.symmetric(
                            vertical: CustomSize.sizeX,
                            horizontal: CustomSize.sizeXX,
                          ),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.copy,
                            color: CustomColor.colorDark,
                            size: CustomSize.sizeXVII,
                          ),
                          Text(
                            '  ${subAddress(context.watch<LoginWallet>().loginAccount.id, 12)}',
                            style: TextStyle(
                              color: CustomColor.colorSecondary,
                              fontSize: CustomSize.sizeXVII,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: CustomSize.sizeXXX,
                    ),
                    FutureBuilder<BigInt>(
                      future: accountBalance,
                      builder: (BuildContext context,
                          AsyncSnapshot<BigInt> snapshot) {
                        if (snapshot.hasData) {
                          return Text(
                            'Balance: ${ethers.utils.formatEther(snapshot.data!)} ETH',
                            style: TextStyle(
                              color: CustomColor.colorDark,
                              fontSize: CustomSize.sizeXV,
                            ),
                          );
                        } else {
                          return loadingCircularSmall();
                        }
                      },
                    ),
                    SizedBox(
                      height: CustomSize.sizeL,
                    ),
                    // EditNameForm(
                    //   account: context.watch<LoginWallet>().loginAccount,
                    // ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        ElevatedButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                              backgroundColor: CustomColor.colorPrimary,
                              padding: EdgeInsets.symmetric(
                                vertical: CustomSize.sizeX,
                                horizontal: CustomSize.sizeXX,
                              ),
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              FaIcon(
                                FontAwesomeIcons.gears,
                                color: CustomColor.colorLight,
                                size: CustomSize.sizeXVII,
                              ),
                              Text(
                                '  Setting',
                                style: TextStyle(
                                  color: CustomColor.colorLight,
                                  fontSize: CustomSize.sizeXVII,
                                ),
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const LoginView()),
                            );
                          },
                          style: TextButton.styleFrom(
                              backgroundColor: CustomColor.colorPrimary,
                              padding: EdgeInsets.symmetric(
                                vertical: CustomSize.sizeX,
                                horizontal: CustomSize.sizeXX,
                              ),
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                'Logout  ',
                                style: TextStyle(
                                  color: CustomColor.colorLight,
                                  fontSize: CustomSize.sizeXVII,
                                ),
                              ),
                              FaIcon(
                                FontAwesomeIcons.arrowRightFromBracket,
                                color: CustomColor.colorLight,
                                size: CustomSize.sizeXVII,
                              ),
                            ],
                          ),
                        ),
                      ],
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

class EditNameForm extends StatefulWidget {
  const EditNameForm({Key? key, required this.account}) : super(key: key);
  final AccountModel account;
  @override
  _EditNameFormState createState() => _EditNameFormState();
}

class _EditNameFormState extends State<EditNameForm> {
  final _formKeyRegister = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.account.name!;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKeyRegister,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            controller: _nameController,
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
            keyboardType: TextInputType.text,
            onSaved: (value) => {},
            onChanged: (value) => {
              if (_formKeyRegister.currentState!.validate())
                {
                  _formKeyRegister.currentState!.save(),
                }
              else
                {}
            },
            validator: (value) {
              if (value!.isEmpty) {
                return 'Account name cannot be null!';
              }
              return null;
            },
          ),
          SizedBox(
            height: CustomSize.sizeXX,
          ),
        ],
      ),
    );
  }
}
