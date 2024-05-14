import { useRef, useState, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const InputWithCustomKeyboard = ({
  title = 'input field',
  onChange,
  onKeyPress,
}: {
  title?: string;
  onChange: (input: string) => void;
  onKeyPress?: (button: string) => void;
}) => {
  const [input, setInput] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect to attach and detach event listeners
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowKeyboard(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Detach the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyboardChange = (input: string) => {
    setInput(input);
    onChange(input);
  };

  const handleKeyPress = (button: string) => {
    if (onKeyPress) {
      onKeyPress(button);
      setInput(input + button);
    }
  };

  return (
    <div>
      <input
        title={title}
        type='text'
        value={input}
        ref={inputRef}
        onFocus={handleInputFocus}
        onChange={(e) => handleKeyboardChange(e.target.value)}
      />
      {showKeyboard && (
        <Keyboard onChange={handleKeyboardChange} onKeyPress={handleKeyPress} />
      )}
    </div>
  );
};

export default function SimpleKeyboard() {
  const [email, setEmail] = useState('');

  const onEmailChange = (input: string) => {
    setEmail(input);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <InputWithCustomKeyboard onChange={onEmailChange} />
    </div>
  );
}
