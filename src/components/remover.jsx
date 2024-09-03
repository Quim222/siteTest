import Swal from 'sweetalert2';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Database, FIREBASE_AUTH, storage } from '../../firebase';

// Função para remover todas as mensagens da coleção "Message"
export const removerMensagem = async (router) => {
    try {
        const q = query(collection(Database, 'Message'));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        Swal.fire('Success', 'Coleção eliminada com sucesso.', 'success');
    } catch (error) {
        console.error('Erro ao remover mensagens: ', error);
        Swal.fire('Error', 'Erro ao remover mensagens.', 'error');
    }
};

// Função para remover um animal específico da coleção "AnimalsUser"
export const removerAnimal = async (nomeAnimal, RacaAnimal, imagem, id) => {
    try {
        const q = query(collection(Database, 'AnimalsUser'), where('NomeAnimal', '==', nomeAnimal), where('RacaAnimal', '==', RacaAnimal));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        await removerPublicaçao(nomeAnimal, RacaAnimal,id);
        await removerImagem(imagem);

        Swal.fire({
            title: 'Success',
            text: 'Animal delete with success',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Recarrega a página
            }
        });
    } catch (error) {
        console.error("Erro ao remover animais: ", error);
        Swal.fire("Error", "Error deleting animals", "error");
    }
};

// Função para remover uma publicação específica da coleção "Post"
export const removerPublicaçao = async (nomeAnimal, RacaAnimal,id) => {
    try {
        const q = query(collection(Database, 'Post'), where('NomeAnimal', '==', nomeAnimal), where('RacaAnimal', '==', RacaAnimal), where('UserUid','==',id));
        const querySnapshot = await getDocs(q);

        for (const docSnapshot of querySnapshot.docs) {
            const docRef = docSnapshot.ref;

            const docData = docSnapshot.data();
            if (docData.Estado === 'Missing') {
                // Subcoleção que você deseja excluir
                const subCollectionRef = collection(docRef, 'routeAnimal'); // substitua 'subCollectionName' pelo nome da sua subcoleção

                // Busca e exclui todos os documentos da subcoleção
                const subCollectionSnapshot = await getDocs(subCollectionRef);
                const deleteSubCollectionPromises = subCollectionSnapshot.docs.map(subDoc => deleteDoc(subDoc.ref));
                await Promise.all(deleteSubCollectionPromises);
            }
            // Depois de excluir todos os documentos da subcoleção, exclua o documento principal
            await deleteDoc(docRef);
        }

        
    } catch (error) {
        console.error("Erro ao remover publicação: ", error);
        Swal.fire('Error', 'Error deleting publication', 'error');
    }
};

// Função para remover uma imagem do Firebase Storage
export const removerImagem = async (fileURL) => {
    try {
        const baseURL = "https://firebasestorage.googleapis.com/v0/b/petalert-755d9.appspot.com/o/";

        if (!fileURL.startsWith(baseURL)) {
            throw new Error('URL inválida para o Firebase Storage');
        }

        const startIdx = baseURL.length;
        const endIdx = fileURL.indexOf("?");
        let filePath = fileURL.substring(startIdx, endIdx);

        filePath = decodeURIComponent(filePath);

        const fileRef = ref(storage, filePath);
        console.log('Removendo arquivo:', filePath, 'URL:', fileURL);

        await deleteObject(fileRef);
        console.log('Arquivo removido com sucesso');
    } catch (error) {
        console.error('Erro ao remover o arquivo:', error);
        Swal.fire('Error', 'Error deleting image', 'error');
    }
};

// Função para remover um usuário
export const removerUser = async (uid) => {
    try {
        const user = FIREBASE_AUTH.currentUser;

        if (user && user.uid === uid) {
            await deleteUser(user);
            Swal.fire('Success', 'Usuário removido com sucesso', 'success');
        } else {
            console.error('Erro ao remover usuário: usuário não autenticado ou UID inválido');
            Swal.fire('Error', 'Usuário não autenticado ou UID inválido', 'error');
        }
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        Swal.fire('Error', 'Erro ao remover usuário.', 'error');
    }
};
