@isTest
private class ToolingTest1_Test {

  static testMethod void assertName() {
    ToolingTest1 t = new ToolingTest1();
    System.assert(t.getName() == 'name');
  }

}