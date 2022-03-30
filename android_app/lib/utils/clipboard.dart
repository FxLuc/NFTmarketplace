import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../widgets/snack_bar.dart';

Future<void> copyToClipboard(context, value) async {
  await Clipboard.setData(ClipboardData(text: value));
  ScaffoldMessenger.of(context).showSnackBar(
    snackBarControl(
      'Copied to your clipboard!',
      'OK',
    ),
  );
}
