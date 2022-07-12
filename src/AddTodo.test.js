import { render, screen, fireEvent, getRoles} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const task = "Lab quiz";
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "03/10/2023";

  
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  
  const check = screen.getAllByText(/Math Test/i)

  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const task = "";
  const dueDate = "09/17/2023";
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.queryByText(/You have no todo's left/i);

  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "03/23/2023";

  fireEvent.change(inputTask, {target: { value: "Lab quiz"}});
  fireEvent.change(inputDate, { target: { value: null}});
  fireEvent.click(element);

  expect(document.getElementById(/Lab quiz/i)).toBeNull();
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/23/2023";

  fireEvent.change(inputTask, { target: { value: "Lab quiz"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  const checkbox = screen.getAllByRole('checkbox');
  fireEvent.click(checkbox[0]);
  expect(document.getElementById(/Lab quiz/i)).toBeNull();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/22/2022";
  fireEvent.change(inputTask, { target: { value: "Lab quiz"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/Lab quiz/i).style.background;
  
  expect(historyCheck).toBe("purple");
 });