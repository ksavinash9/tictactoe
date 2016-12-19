import './testutils';
import App from './App';
import GameBoard from './models/GameBoard'

describe('App Component Testing', function () {
  let component;
  let textInput;
  const defaultState = {gameStarted: false};

  beforeEach(function () {
    component = shallow(<App />);
    textInput = component.find('Text');
  });

  it('has default state', function () {
    expect(component.state()).to.eql(defaultState);
  });

  it('renders welcome text', function () {
    const expectedText = 'Welcome to the game!';
    const text = component.find('Text').children().text();
    expect(text).to.eql(expectedText);
  });

  // describe('when Game State changes', function () {
  //   const newTextValue = 'random string';
  //   beforeEach(function () {
  //     textInput.simulate('changeText', newTextValue);
  //   });
  //
  //   it('updates component state', function () {
  //     expect(component.state().text).to.eql(newTextValue);
  //   });
  //
  //   describe('when Result callback is called', function () {
  //     beforeEach(function () {
  //       const childComponent = component.find(GameBoard);
  //       childComponent.simulate('clear');
  //     });
  //
  //     it('resets state', function () {
  //       expect(component.state()).to.eql(defaultState);
  //     });
  //   });
  // });
});
