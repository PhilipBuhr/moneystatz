import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { JarModal } from "./JarModal";
import { Month } from '../../service/month';


describe('JarModal', () => {
    let onClose;
    let onSubmit;
    let onChange;
    let jar;

    beforeEach(() => {
        onClose = jest.fn();
        onChange = jest.fn();
        onSubmit = jest.fn();
        jar = { name: '', uuid: 'uuid', order: 3, type: 'expense' }
    });

    it('should render', () => {
        const { container } = render(
            <JarModal
                active={true}
                jar={jar}
                month={new Month(3, 2020)}
                close={onClose}
                change={onChange}
                submit={onSubmit}
            />);
        expect(container).toMatchSnapshot('JarModalSnapshot');
    });

    it('should close only on background click', () => {
        const { container } = render(
            <JarModal
                active={true}
                jar={jar}
                month={new Month(3, 2020)}
                close={onClose}
                change={onChange}
                submit={onSubmit}
            />);

        fireEvent.click(container.querySelector('.Modal-modal'));

        expect(onClose).not.toHaveBeenCalled();

        fireEvent.click(container.querySelector('.Modal-container'));

        expect(onClose).toHaveBeenCalled();
    });

    it('should close on close button click', () => {
        render(
            <JarModal
                active={true}
                jar={jar}
                month={new Month(3, 2020)}
                close={onClose}
                change={onChange}
                submit={onSubmit}
            />);

        fireEvent.click(screen.getByAltText('Cancel'));

        expect(onClose).toHaveBeenCalled();
    });

    it('should change selected jar', () => {
        const { container } = render(
            <JarModal
                active={true}
                jar={jar}
                month={new Month(3, 2020)}
                close={onClose}
                change={onChange}
                submit={onSubmit}
            />);

        fireEvent.change(container.querySelector('input'), { target: { value: 'jarName' } });

        expect(onChange).toHaveBeenCalledWith({name: 'jarName', uuid: 'uuid', order: 3, type: 'expense'})
    });

    it('should submit new Jar', () => {
        render(
            <JarModal
                active={true}
                jar={{...jar, name: 'jarName'}}
                month={new Month(3, 2020)}
                close={onClose}
                change={onChange}
                submit={onSubmit}
            />);

        fireEvent.click(screen.getByAltText('Submit'));

        expect(onSubmit).toHaveBeenCalledWith({ name: 'jarName', uuid: 'uuid', type: 'expense', order: 3 });
    });
});
