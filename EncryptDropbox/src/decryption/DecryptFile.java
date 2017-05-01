package decryption;

import java.io.File;
import java.nio.file.Files;

import javax.crypto.Cipher;

import com.rsa.TryRSA;

import UIFunctions.UIFunctions;

import utility.Utils;

public class DecryptFile {

	static final int mode=Cipher.DECRYPT_MODE;
	String password;
	int numberOfBits;
	String algorithm;
	String transformation;
	String userName;
	
	public DecryptFile(int numberOfBits, String algorithm,String transformation,String userName,String password) {
		super();
		this.password = password;
		this.numberOfBits = numberOfBits;
		this.algorithm = algorithm;
		this.transformation=transformation;
		this.userName=userName;
	}

	
	/** used to decrypt a file
	 * @param inputFile
	 * @param outputFile
	 * @return
	 * @throws Exception
	 */
	public boolean  Decrypt(File inputFile,File outputFile) throws Exception{
		
		boolean equals=false;
		Utils ut = new Utils();
		// get the required details from db based on the user name and file name.
		UIFunctions.downloadFromDropbox("fileEncKey_"+inputFile.getName().substring(4)+".keycipher");
		TryRSA t=new TryRSA();
		t.execute("decryptFileEncKey", null, "temp/"+userName+"_private.key", "temp/"+"fileEncKey_"+inputFile.getName().substring(4)+".keycipher");
		
		File f=new File("temp/fileEncKey_"+inputFile.getName().substring(4)+".keycipherplain");
		byte[] fileEncKey=Files.readAllBytes(f.toPath());
		
		// decrypt the file
		ut.encryptFile(transformation,Cipher.DECRYPT_MODE, inputFile, outputFile,fileEncKey);
		
		// calculate the hash value of the file recieved after decryption.
		
		//String calHash = ut.generateHash(outputFile, hashKey) ;
		
		// compare the hash key and then give the output
		
		
		equals=true;
		
		
		return equals;
	}
	
	
	
	
	
	
}
