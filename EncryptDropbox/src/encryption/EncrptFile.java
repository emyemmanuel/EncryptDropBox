package encryption;

import java.io.File;
import java.io.FileOutputStream;

import javax.crypto.Cipher;

import com.rsa.TryRSA;

import UIFunctions.UIFunctions;

import decryption.DecryptFile;

import utility.Utils;


public class EncrptFile {

	static final int mode=Cipher.ENCRYPT_MODE;
	String password;
	int numberOfBits;
	String algorithm;
	String transformation;
	String userName;
	public EncrptFile(int numberOfBits, String algorithm,String transformation,String username) {
		super();
		this.numberOfBits = numberOfBits;
		this.algorithm = algorithm;
		this.transformation=transformation;
		this.userName=username;
	}
	/** used to encrypt the file.
	 * @param inputFile
	 * @param outputFile
	 * @throws Exception
	 */
	public void Encrypt(File inputFile,File outputFile) throws Exception{	
		Utils newObj = new Utils();
		byte fileEncKey[] = newObj.generateKey(16);
		String fileEncKeyFile="temp/"+"fileEncKey_"+inputFile.getName()+".key";
		newObj.encryptFile(transformation,Cipher.ENCRYPT_MODE, inputFile, outputFile, fileEncKey);
		TryRSA t=new TryRSA();
		t.execute("encryptFileEncKey", "temp/"+userName+"_public.key", "temp/"+userName+"_private.key", fileEncKeyFile);
		UIFunctions.uploadToDropbox(fileEncKeyFile+"cipher","fileEncKey_"+inputFile.getName()+".keycipher");
	 	System.out.println("Encryption done successfully");
	}
}
