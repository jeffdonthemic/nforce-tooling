@isTest
private class ToolingTest2_Test {

  static testMethod void assertName() {
    ToolingTest2 t = new ToolingTest2();
    // this should fail
    System.assert(t.getCounter() == 1);
  }

}