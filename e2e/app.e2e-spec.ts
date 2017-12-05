import { MoniterPage } from './app.po';

describe('moniter App', () => {
  let page: MoniterPage;

  beforeEach(() => {
    page = new MoniterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
