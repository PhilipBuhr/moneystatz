import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { JarModal } from "./JarModal";
import { Month } from '../../service/month';


describe('JarModal', () => {
    let onClose;
    let onSubmit;

    beforeEach(() => {
        onClose = jest.fn();
        onSubmit = jest.fn();
    });

    it('should render', () => {
        const { container } = render(
            <JarModal
                active={true}
                month={new Month(3, 2020)}
                close={onClose}
                submit={onSubmit}
            />);
        expect(container).toMatchSnapshot('JarModalSnapshot');
    });

    it('should close only on background click', () => {
        const { container } = render(
            <JarModal
                active={true}
                month={new Month(3, 2020)}
                close={onClose}
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
                month={new Month(3, 2020)}
                close={onClose}
                submit={onSubmit}
            />);

        fireEvent.click(screen.getByAltText('Cancel'));

        expect(onClose).toHaveBeenCalled();
    });

    it('should submit new Jar', () => {
        const { container } = render(
            <JarModal
                active={true}
                month={new Month(3, 2020)}
                close={onClose}
                submit={onSubmit}
            />);

        fireEvent.change(container.querySelector('input'), { target: { value: 'jarName' } });
        fireEvent.click(screen.getByAltText('Submit'));

        expect(onSubmit).toHaveBeenCalledWith('jarName', {month: 3, year: 2020});
    });
});
