class ApiEnpoint {
  static String httpProvider =
      'https://goerli.infura.io/v3/688437a972c14517ac4575d8dbd00124';

  static String serverEndpoint = 'http://103.170.246.112:50667';

  
  static String get createAccount {
    return '$serverEndpoint/account/create';
  }

  static String get itemRawData {
    return '$serverEndpoint/raw/item';
  }

  static String get itemNewest {
    return '$serverEndpoint/item/newest';
  }

  static String get itemDetail {
    return '$serverEndpoint/item';
  }

  static String get itemSearch {
    return '$serverEndpoint/item';
  }

  static String get itemCreate {
    return '$serverEndpoint/item';
  }

  static String get itemChangePrice {
    return '$serverEndpoint/item';
  }
}
