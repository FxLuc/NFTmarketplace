class ApiEnpoint {
  static String httpProvider =
      'https://goerli.infura.io/v3/688437a972c14517ac4575d8dbd00124';

  static String serverEndpoint = 'http://103.170.246.112:50667';
  
  static String createAccount = '$serverEndpoint/account/create';

  static String getAccount = '$serverEndpoint/account';

  static String transaction = '$serverEndpoint/account/transaction';

  static String itemRawData = '$serverEndpoint/raw/item';

  static String itemNewest = '$serverEndpoint/item/newest';

  static String itemDetail = '$serverEndpoint/item';

  static String itemSearch = '$serverEndpoint/item/search';

  static String itemCreate = '$serverEndpoint/item/create';

  static String itemChangePrice = '$serverEndpoint/item/changeprice';
}
