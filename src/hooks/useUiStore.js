import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../redux/slices/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const openDateModal = () =>{
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () =>{
        dispatch(onCloseDateModal(false));
    }

    const toggleDateModal = () =>{
        isDateModalOpen
        ? openDateModal()
        : closeDateModal();
    }

    return {
        // Propiedades
        isDateModalOpen,

        // Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}