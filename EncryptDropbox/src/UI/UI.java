package UI;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JScrollPane;
import javax.swing.border.EmptyBorder;

import com.dropbox.core.DbxAppInfo;
import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWebAuthNoRedirect;

//import authentication.authenticate;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Locale;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JTextField;
import javax.swing.ScrollPaneConstants;
import javax.swing.Box;
import javax.swing.JTextArea;
import javax.swing.JLabel;

public class UI extends JFrame {

	public static JFrame frame;
	
	public JPanel contentPane;
	public JTextField textField;
	public String chosenFile;
	public String filepath;
	public JButton btnBrowse,btnUpload,btnRetrieve,btnBack;
	public JScrollPane txtscroll;
	

	public JButton btnKey;


	private JButton btnRetrieve2;

	private JLabel label;
	
	public static JTextArea txtrListOfFiles;
	

	/**
	 * Create the frame.
	 */
	public UI() {
		boolean submitFlag = false;
		 frame = new JFrame();
		 frame.setLocationRelativeTo(null);
		 frame.setResizable(false);
		frame.setVisible(false);
		frame.setFont(new Font("Bell MT", Font.BOLD, 12));
		frame.setTitle("Encryption-Decryption-Dropbox");
		//pack();		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setBounds(100,100,993,993);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		frame.setContentPane(contentPane);
		contentPane.setLayout(null);
		//////////////////////////////////////////////////
		btnKey = new JButton("Generate Key Pair");
		btnKey.setBounds(149, 180, 350, 35);
		btnKey.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(btnKey);
		
		
		btnRetrieve2 = new JButton("Download Public Key");
		btnRetrieve2.setBounds(530, 180,320,35);
		btnRetrieve2.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(btnRetrieve2);
		
		//////////////////////////////////////////////////
		btnBrowse = new JButton("Select File to Encrypt");
		btnBrowse.setBounds(149, 223, 350, 35);
		btnBrowse.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(btnBrowse);
		
		textField = new JTextField();
		textField.setBounds(530, 224, 320, 32);
		textField.setEditable(false);
		textField.setFont(new Font("Cambria", Font.PLAIN, 24));
		contentPane.add(textField);
		textField.setColumns(10);
		
				
		btnUpload = new JButton("Upload to Dropbox");
		btnUpload.setFont(new Font("Cambria", Font.BOLD, 24));
		btnUpload.setBounds(370, 300,280,35);
		contentPane.add(btnUpload);
		
		
		btnRetrieve = new JButton("Decrypt & Retrieve from Dropbox");
		btnRetrieve.setBounds(149,350,320,35);
		btnRetrieve.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(btnRetrieve);
		
		
		btnBack = new JButton("Back");
		btnBack.setBounds(408, 800,141,35);
		btnBack.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(btnBack);	

		label = new JLabel("List of Files in Dropbox");
		label.setBounds(149,400,281,35);
		label.setFont(new Font("Cambria", Font.BOLD, 24));
		contentPane.add(label);

		
		txtrListOfFiles = new JTextArea();
		txtrListOfFiles.setText(" List of files :");
		txtrListOfFiles.setAutoscrolls(true);
		txtrListOfFiles.setCaretPosition(0);
		txtrListOfFiles.setFont(new Font("Cambria", Font.PLAIN, 14));
		
		
		
		 txtscroll = new JScrollPane(txtrListOfFiles);
		 txtscroll.setBounds(149, 436, 660, 242);
		 txtscroll.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		 contentPane.add(txtscroll);
	 		    		
		
	}

	
	
	public void addBrowseListener(ActionListener listenForBrowse)
	{
		      
		 btnBrowse.addActionListener(listenForBrowse);
	}
	
	public void addUploadListener(ActionListener listenForUpload)
	{
		btnUpload.addActionListener(listenForUpload);
	}
	public void addRetrieveListener(ActionListener listenForRetrieve)
	{
		btnRetrieve.addActionListener(listenForRetrieve);
	}



	public void addBackListener(ActionListener listenForBack) {
		// TODO Auto-generated method stub
		 btnBack.addActionListener(listenForBack);
	}
	
	public void addSubmitListener2(ActionListener listenForSubmit2)
	{
		      
		 btnKey.addActionListener(listenForSubmit2);
	}

	public void addSubmitListener3(ActionListener listenForSubmit3)
	{
		      
		btnRetrieve2.addActionListener(listenForSubmit3);
	}
	
	
}


