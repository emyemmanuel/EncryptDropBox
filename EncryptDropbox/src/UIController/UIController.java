package UIController;

import java.awt.Desktop;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Scanner;

import javax.swing.JFileChooser;
import javax.swing.JOptionPane;

import com.dropbox.core.DbxAppInfo;
import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWebAuthNoRedirect;
import com.dropbox.core.DbxWriteMode;
import com.rsa.TryRSA;

import Login.login;
import UI.UI;
import UIFunctions.UIFunctions;
import decryption.DecryptFile;
import encryption.EncrptFile;
import utility.Utils;


public class UIController {
	
	public static login log;
	public static UI ui;
	public static UIController uc;
	public String chosenFile;
	public String filepath;
	
	
	String username,password;
	String jusFileName;
	String fileName;
	boolean upload;
	boolean download;
	boolean auth;
	public static UIFunctions func;
	int flag=0;
	
	public UIController(login log, UI ui, UIFunctions func)
	{
	this.log=log;
	this.ui=ui;
	this.func=func;
	
	UIController.log.addSubmitListener(new listenForSubmit());
	UIController.ui.addBrowseListener(new listenForBrowse());
	UIController.ui.addUploadListener(new listenForUpload());
	UIController.ui.addRetrieveListener(new listenForRetrieve());
	UIController.ui.addBackListener(new listenForBack());
	
	
	///////////////////////////////////
	UIController.ui.addSubmitListener2(new listenForSubmit2());
	UIController.ui.addSubmitListener3(new listenForSubmit3());

	///////////////////////////////////
	}
	
	public class listenForSubmit implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			login.loginFrame.setVisible(false);
			login.loginFrame.dispose();
			UI.frame.setVisible(true);
			UI.frame.setLocationRelativeTo(null);
			ui.textField.setText("");
			username = login.txtUsername.getText();
			password = login.txtPassword.getText();
			try {
				auth=UIFunctions.authenticate();
				com.rsa.TryRSA rsa=new com.rsa.TryRSA(); 
			} catch (DbxException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} 
			
			if(auth==true)
			{
			try {
				UIFunctions.listDropboxFolders("/");
			} catch (DbxException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (Exception e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
			}
			
			
		}
		
	}

	
	
	public class listenForSubmit2 implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			login.loginFrame.setVisible(false);
			login.loginFrame.dispose();
			UI.frame.setVisible(true);
			UI.frame.setLocationRelativeTo(null);
			ui.textField.setText("");
			username = login.txtUsername.getText();
			password = login.txtPassword.getText();
			
			try {
				auth=UIFunctions.authenticate();
				TryRSA rsa=new TryRSA();
				rsa.execute("generateKeys","temp/"+username+"_public.key","temp/"+username+"_private.key",null);
				UIFunctions.uploadToDropbox("temp/"+username+"_public.key",username+"_public.key");
				
			} catch (DbxException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (IOException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
			
			if(auth==true)
			{
			try {
				UIFunctions.listDropboxFolders("/");
			} catch (DbxException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (Exception e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
			}
			
			
		}
		
	}
	
	public class listenForSubmit3 implements ActionListener{
		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			ArrayList<String> dropList = new ArrayList<String>();
			try {
				auth=UIFunctions.authenticate();
			} catch (DbxException e4) {
				// TODO Auto-generated catch block
				e4.printStackTrace();
			}

			try {
				
				dropList= UIFunctions.listDropDownFiles("/");
			} catch (DbxException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			} catch (Exception e3) {
				// TODO Auto-generated catch block
				e3.printStackTrace();
			}
			
			Object[] options =  dropList.toArray();
			
		    String dnldfilematch = (String) JOptionPane.showInputDialog(null, "Choose file...",
		        "Choose file to decrypt", JOptionPane.QUESTION_MESSAGE, null, options,options[0]); 
		    System.out.println("DFM "+dnldfilematch);	
			

			if(dnldfilematch==null)
			{
				JOptionPane.showMessageDialog(UI.frame,"This file doesn't exist in dropbox. Please select valid file");
			}
			else
			{
				try {
					//UIFunctions.downloadFromDropbox(dnldfilematch);
					download=UIFunctions.downloadFromDropbox(dnldfilematch);
				} catch (DbxException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			 
				 System.out.println("Downloaded file name :"+dnldfilematch.substring(0, 4));
				 Desktop desktop = Desktop.getDesktop();
			        File dirToOpen = null;
			        try {
			            dirToOpen = new File("temp/");
						desktop.open(dirToOpen);
						} catch (IOException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
			}
		}
	
	}
	
	
	public class listenForBack implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			flag++;
			login.loginFrame.setVisible(true);
			login.txtUsername.setText("");
			login.txtPassword.setText("");
			
			UI.frame.setVisible(false);
			UI.frame.dispose();
			login.loginFrame.setLocationRelativeTo(null);
		
			
			
		}
		
	}

	
	
	public class listenForBrowse implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			//ui.frame.setVisible(true);
			JFileChooser chooser = new JFileChooser();
            chooser.setCurrentDirectory(new java.io.File("."));
            chooser.setDialogTitle("Browse the folder to process");
            chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
            chooser.setAcceptAllFileFilterUsed(false);
            //chooser.setPreferredSize(new Dimension(int width,int height));

            if (chooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
                System.out.println("getCurrentDirectory(): "+ chooser.getCurrentDirectory());
                System.out.println("getSelectedFile() : "+ chooser.getSelectedFile());
                chosenFile=chooser.getSelectedFile().toString();
                String cut[] = chosenFile.split("\\\\");
                fileName= chooser.getSelectedFile().getName();
                int len= cut.length;
                //jusFileName = cut[len-1];
                jusFileName = fileName;
                ui.textField.setText(fileName);
            } else {
                System.out.println("No Selection ");
            }
          
            filepath= chosenFile;
            System.out.println("Chosen file is :"+filepath);
        }
				
	}
	
	
	
	public class listenForUpload implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			
			if(filepath == null)
			{
				JOptionPane.showMessageDialog(UI.frame, "Please select a file to upload using Browse");
			}
			else
			{
				
				 
				//Check and Upload the file 
				 try {
					String em="ENC_"+fileName;
					
					
								//Encrypt the file
								String efile ;
								EncrptFile encFile=new EncrptFile(128,"AES","AES",username);
								//input file to be encrypted
								File inputFile = new File(filepath);
								if(!inputFile.exists())
								{
									inputFile.createNewFile();
									
								}
								//output location for the encrypted file
								efile="temp/"+ fileName;
								File encryptedFile = new File(efile);
								
								System.out.println("Enc file path :"+efile);
								//Call the Encrypt function
								 try {
									encFile.Encrypt(inputFile, encryptedFile);
								} catch (Exception e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
								
								
								upload=UIFunctions.uploadToDropbox(efile,em);
								System.out.println("Boolean value upload: "+upload);
								if(upload == true){
									JOptionPane.showMessageDialog(UI.frame, "Uploaded the encrypted form of "+jusFileName +" successfully to DropBox");
								
									
								//Delete the file from the temp folder
									File fileDel = new File(efile);      
									fileDel.delete();
							}
							}
						
					
				 catch (DbxException | IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				 
				
			}
			
			
			
		}
		
	}

	
	public class listenForRetrieve implements ActionListener{

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			ArrayList<String> dropList = new ArrayList<String>();
			
			try {
				dropList= UIFunctions.listDropDownFiles("/");
			} catch (DbxException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			} catch (Exception e3) {
				// TODO Auto-generated catch block
				e3.printStackTrace();
			}
			
			Object[] options =  dropList.toArray();
			
		    String dnldfilematch = (String) JOptionPane.showInputDialog(null, "Choose file...",
		        "Choose file to decrypt", JOptionPane.QUESTION_MESSAGE, null, options,options[0]); 
		    System.out.println("DFM "+dnldfilematch);	
			
			//input the filename	
			
		/*	String dnldinput = JOptionPane.showInputDialog("Enter the file to decrypt:");
		    System.out.println(dnldinput);
			
			DbReturns obj3 =new DbReturns();
			SecurityApp sa1 = new SecurityApp();
			obj3=sa1.getData(username, dnldinput);
			
			System.out.println("FILE NAME : "+obj3.getFileName());
			String dnldfilematch = obj3.getFileName(); */
			if(dnldfilematch==null)
			{
				JOptionPane.showMessageDialog(UI.frame,"This file doesn't exist in dropbox. Please select valid file");
			}
			else
			{
				try {
					UIFunctions.downloadFromDropbox("fileEncKey_"+dnldfilematch.substring(5)+".keycipher");
					download=UIFunctions.downloadFromDropbox(dnldfilematch);
				} catch (DbxException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			 
				 System.out.println("Downloaded file name :"+dnldfilematch.substring(0, 4));
				
				 if(dnldfilematch.substring(0,4).equals("/ENC"))
				 {
					 
				String dnldfile=dnldfilematch.substring(1);	 
					 
				//decrypt the file
				String dfile= "temp/";
				//check for filename + username+ hash of pwd
				
				// connection to database to get the required values.
				
				
				boolean passwordCorrect= true;
				if(passwordCorrect == true )
				{
				DecryptFile d= new DecryptFile(128,"AES","AES",username,password);
				
				System.out.println("Downloaded file :"+dnldfile);
				File encryptedFile = new File(dfile+dnldfile);
				String actualFileName = dnldfile.substring(4);
				File decFile=new File(dfile+actualFileName);
				boolean fileCorrupt = false;
				try {
					
					fileCorrupt= d.Decrypt(encryptedFile, decFile);
										
					
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
					JOptionPane.showMessageDialog(UI.frame,"Private Key Not Valid");
				}
				String message;
				if(fileCorrupt == true)
				{	
					message = "The file is succesfully decrypted and downloaded";
					JOptionPane.showMessageDialog(UI.frame,message);
					
				
				
				
				
				//Delete the encrypted file
				File fileDeldownload = new File(dfile+dnldfile);      
				fileDeldownload.delete();
				
				//open the respective folder
				Desktop desktop = Desktop.getDesktop();
		        File dirToOpen = null;
		        try {
		            dirToOpen = new File("temp/");
		            try {
						desktop.open(dirToOpen);
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
		        } catch (IllegalArgumentException iae) {
		            System.out.println("File Not Found");
		        }
				}
				 }
				 }
				 else
				 {
					 JOptionPane.showMessageDialog(UI.frame,"This file is not in encrypted format. So cannot decrypt it");
				 }
				 
				 
				 
			}
			
			
		}
		
	}
	
		
	}

	
	
	

