import 'package:ethers/ethers.dart';

String subAddress(String? address, int length) {
  final start = address?.substring(0, length + 2);
  final end = address?.substring(42 - length);
  return (start! + '...' + end!);
}

String covertToEther(BigInt wei) {
  return ethers.utils.formatEther(wei);
}