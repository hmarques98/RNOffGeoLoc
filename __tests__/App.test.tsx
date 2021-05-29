import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

function Example() {
  const [name, setUser] = React.useState('');
  const [show, setShow] = React.useState(false);

  return (
    <View>
      <TextInput value={name} onChangeText={setUser} testID="input" />
      <Button
        title="Print Username"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(() => {
            setShow(!show);
          }, Math.floor(Math.random() * 200));
        }}
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  );
}

test('examples of some things', async () => {
  const { getByTestId, getByText, queryByTestId, toJSON } = render(<Example />);
  const famousProgrammerInHistory = 'Ada Lovelace';

  const input = getByTestId('input');
  fireEvent.changeText(input, famousProgrammerInHistory);

  const button = getByText('Print Username');
  fireEvent.press(button);

  await waitFor(() => expect(queryByTestId('printed-username')).toBeTruthy());

  // expect(getByTestId('printed-username').props.children).toBe(famousProgrammerInHistory);
  expect(getByTestId('printed-username')).toHaveTextContent(
    famousProgrammerInHistory,
  );
  expect(toJSON()).toMatchSnapshot();
});
