import Swal from 'sweetalert2';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Database, FIREBASE_AUTH, storage } from '../../firebase';



// Função para remover um animal específico da coleção "AnimalsUser"
export const removerAnimal = async (nomeAnimal, RacaAnimal, imagem, id) => {
    let loadingSwal;

    try {
        // Exibe a mensagem de loading
        loadingSwal = Swal.fire({
            title: 'Wait...',
            text: 'Deleting animal...',
            allowOutsideClick: false, // Impede o fechamento ao clicar fora
            didOpen: () => {
                Swal.showLoading(); // Mostra o indicador de loading
            }
        });

        // Função para remover os documentos
        const q = query(collection(Database, 'AnimalsUser'), where('NomeAnimal', '==', nomeAnimal), where('RacaAnimal', '==', RacaAnimal));
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Funções adicionais
        await removerPublicaçao(nomeAnimal, RacaAnimal, id);
        await removerImagem(imagem);

        // Fecha o Swal de loading e mostra a mensagem de sucesso
        Swal.close();
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
        // Fecha o Swal de loading em caso de erro e mostra a mensagem de erro
        if (loadingSwal) Swal.close();
        Swal.fire("Erro", "Erro ao excluir o animal", "error");
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


