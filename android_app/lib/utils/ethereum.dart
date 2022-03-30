import 'package:ethers/ethers.dart';
import 'package:ethers/providers/json_rpc_provider.dart';

String subAddress(String? address, int length) {
  final start = address?.substring(0, length + 2);
  final end = address?.substring(42 - length);
  return (start! + '...' + end!);
}

String covertToEther(BigInt wei) {
  return ethers.utils.formatEther(wei);
}

Future<BigInt> getBalance(JsonRpcProvider ethProvider, String? address) {
  return ethProvider.getBalance(address!);
}
