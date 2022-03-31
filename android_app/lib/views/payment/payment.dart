import 'package:android_app/models/item_detail.dart';
import 'package:flutter/material.dart';
import '../../utils/constants/theme.dart';

class PaymentView extends StatelessWidget {
  const PaymentView({Key? key, this.item}) : super(key: key);
  final ItemDetail? item;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Payment',
          overflow: TextOverflow.ellipsis,
        ),
        centerTitle: true,
      ),
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
                      'Confirm your order',
                      style: TextStyle(
                        fontSize: CustomSize.sizeXX,
                        fontWeight: FontWeight.bold,
                      ),
                      // textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: CustomSize.sizeXXV,
                    ),
                    Card(
                      shape: RoundedRectangleBorder(
                        side: BorderSide(color: CustomColor.colorGay, width: 1),
                        borderRadius: BorderRadius.circular(CustomSize.sizeX),
                      ),
                      margin: EdgeInsets.only(bottom: CustomSize.sizeXV),
                      child: Container(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(CustomSize.sizeX),
                                bottomLeft: Radius.circular(CustomSize.sizeX),
                              ),
                              child: Image.network(
                                '${item!.picture}',
                                fit: BoxFit.fitWidth,
                                height: CustomSize.sizeC,
                                width: CustomSize.sizeC,
                              ),
                            ),
                            Flexible(
                              child: Padding(
                                padding: EdgeInsets.only(
                                  top: CustomSize.sizeXV,
                                  bottom: CustomSize.sizeXV,
                                  left: CustomSize.sizeXV,
                                  right: CustomSize.sizeXX,
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      '${item!.name}',
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.left,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: CustomSize.sizeXV,
                                    ),
                                    Text(
                                      '${item!.description}',
                                      maxLines: 3,
                                      textAlign: TextAlign.left,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                          color: CustomColor.colorSecondary),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Confirm(item: item),
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

class Confirm extends StatefulWidget {
  const Confirm({Key? key, this.item}) : super(key: key);

  final String? item;

  @override
  _ConfirmState createState() => _ConfirmState();
}

class _ConfirmState extends State<Confirm> {
  final _formKeyRegister = GlobalKey<FormState>();
  final TextEditingController _item = TextEditingController();
  String? registerInput;

  String? checkSecretRecoveryPhraseValid(String? value) {
    if (value!.isEmpty) {
      return 'Please enter your Secret Recovery Phrase';
    } else if (value != _item.text) {
      return 'Secret Recovery Phrase must have 12-words phrase';
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    _item.text = widget.item!;
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
            controller: _item,
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
              // if (_formKeyRegister.currentState!.validate()) {
              //   _formKeyRegister.currentState!.save();
              //   Navigator.push(
              //     context,
              //     MaterialPageRoute(
              //         builder: (context) => RegisterViewFinal(widget.item)),
              //   );
              // }
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
